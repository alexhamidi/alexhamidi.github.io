import Link from "next/link";

export default function CladoPage() {
  return (
    <div className="flex flex-col items-center text-gray-900 font-mono overflow-x-hidden">
      <div className="flex flex-col gap-8 max-w-[700px] px-5 mb-12">
        <div className="flex items-center justify-between mt-8 mb-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 underline">
            ← back to home
          </Link>
          <div className="text-xs text-gray-500">August 2025</div>
        </div>

        <article className="text-sm">
          <h1 className="text-3xl font-bold mb-6">creating a new query language</h1>

          <h3 className="text-xl font-semibold mt-8 mb-4">Background</h3>

          <p className="mb-4 leading-relaxed">
            A few months ago, I joined{" "}
            <a href="https://clado.ai/" className="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">
              Clado
            </a>{" "}
            as a software engineer. I wanted to share a bit about one of my contributions to clado&apos;s people search engine, which performs{" "}
            <a href="https://pbs.twimg.com/media/GwLWi2lWoAAGpOc?format=jpg&name=medium" className="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">
              better than all competitors
            </a>{" "}
            on{" "}
            <a href="https://pearch.ai/" className="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">
              pearch.ai&apos;s
            </a>{" "}
            sourcing{" "}
            <a href="https://arxiv.org/pdf/2504.02463" className="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">
              benchmark
            </a>.
          </p>

          <p className="mb-4 leading-relaxed">
            As a primer: Our search is criteria based, and users can search through 100+ fields across 1B+ profiles in a single query. We achieve this at scale by decomposing the search problem into two subproblems:
          </p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>generating a database query based on the user&apos;s input</li>
            <li>filtering returned profiles in parallel using large language models.</li>
          </ol>

          <p className="mb-4 leading-relaxed">This will be about the first part</p>

          <p className="mb-4 leading-relaxed">
            Around 1 week in, we migrated our database from a MySQL to OpenSearch. After running a set of evals, I found that most open models (in the 18b-32b parameter range) struggled to generate valid OpenSearch queries, primarily because of how much more verbose and complex the syntax was relative SQL.
          </p>

          <p className="mb-4 leading-relaxed">
            For reference, here is an SQL query corresponding to the search &quot;Find me software engineers in SF&quot;:
          </p>

          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4 text-sm">
            <code>{`SELECT *
FROM people
WHERE 
  ( -- this is "criteria 1"
    location LIKE '%SF%'
    OR location LIKE '%San Francisco%' 
  )
  AND ( -- this is "criteria 2"
    current_company_title LIKE '%Software Engineer%'
    OR past_company_title LIKE '%Software Engineer%'
  );`}</code>
          </pre>

          <p className="mb-4 leading-relaxed">And here is the OpenSearch equivalent:</p>

          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4 text-sm">
            <code>{`{
  "query": {
    "bool": {
      "must": [
        {
          "bool": {
            "should": [
              { "match_phrase": { "location": "SF" } },
              { "match_phrase": { "location": "San Francisco" } }
            ],
            "minimum_should_match": 1
          }
        }
      ],
      "should": [
        { "match_phrase": { "current_company_title": "Software Engineer" } },
        { "match_phrase": { "past_company_title": "Software Engineer" } }
      ],
      "minimum_should_match": 1
    }
  }
}`}</code>
          </pre>

          <p className="mb-4 leading-relaxed">
            OpenSearch&apos;s 3x more tokens on average also translated directly to 3x higher inference costs (!). With these problems in mind, I realized something exciting: I could create a <em>completely new language</em> that was optimized for our criteria-based searches, and then interpret that to any query DSL, whether it be SQL, OpenSearch, etc.
          </p>

          <p className="mb-4 leading-relaxed">The new language had to have a few traits:</p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li><em>maximally expressive</em>, meaning it could represent any possible query a user might make to Clado</li>
            <li><em>maximally concise</em> - to reduce token spend, inference time, and failure probability</li>
          </ol>

          <p className="mb-4 leading-relaxed">I eventually arrived at a language that takes the following form:</p>

          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4 text-sm">
            <code>{`[
  ("location", "contains", ["SF", "San Francisco"]),
  (["current_company_title", "past_company_title"], "contains", "Software Engineer")
]`}</code>
          </pre>

          <p className="mb-4 leading-relaxed">This is 1/2 the token length of SQL:</p>

          <table className="min-w-full border-collapse border border-gray-300 my-6 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-semibold text-left">Language</th>
                <th className="border border-gray-300 px-4 py-2 font-semibold text-left">Average Tok Length</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left">SQL</td>
                <td className="border border-gray-300 px-4 py-2 text-left">151</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left">OpenSearch</td>
                <td className="border border-gray-300 px-4 py-2 text-left">459</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-left"><strong>New DSL</strong></td>
                <td className="border border-gray-300 px-4 py-2 text-left"><strong>62</strong></td>
              </tr>
            </tbody>
          </table>

          <p className="mb-4 leading-relaxed">
            Using this new language would mean cheaper and faster generation. We would also no longer need to retrain models every time we switched to a new query language.
          </p>

          <p className="mb-4 leading-relaxed">
            But there was one potential problem - the language is not in the training corpus of the LLM, which, presumably, would make the LLM less effective at generating queries. This is precisely the type of problem that can be solved with LLM fine-tuning.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Fine-tuning</h3>

          <p className="mb-4 leading-relaxed">Fine-tuning is a method used to adapt LLMs to narrow tasks. The two most common types are:</p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Supervised Fine Tuning (SFT) - you provide valid input/output pairs, which the model learns from</li>
            <li>Reinforcement Learning (RL) - you provide a function that scores the LLM&apos;s outputs, which the model learns from</li>
          </ul>

          <p className="mb-4 leading-relaxed">
            We tried to use SFT by running our task through a stronger model, Openai o3, and distilling those outputs to Qwen-32b, with disappointing results:
          </p>

          <img src="/sft.png" alt="SFT Results" className="max-w-full h-auto my-6 rounded-lg border border-gray-200" />

          <p className="mb-4 leading-relaxed">
            SFT alone plateaued because the teacher model didn&apos;t have a robust understanding of the task, and struggled to generate valid DSL that represented the user&apos;s intent (despite how hard we tried to prompt it to).
          </p>

          <p className="mb-4 leading-relaxed">
            Luckily, we could use RL to directly optimize for the metrics we cared about - result quantity and quality. Given that RL will converge towards an optimal policy, the problem becomes defining a reward function.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Training</h3>

          <p className="mb-4 leading-relaxed">
            We trained the model with group-relative optimization using{" "}
            <a href="https://github.com/OpenPipe/ART" className="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">
              ART
            </a>. For each query, we sampled G=4 candidate outputs, parsed them into DSL, executed against an OpenSearch index of ~1B profiles. Each candidate output was scored with the composite reward.
          </p>

          <p className="mb-4 leading-relaxed">
            Training ran for 5k steps with 3–4 rollouts per step, cosine-decayed learning rates, and batch judging across 12 queries at a time.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Results</h3>

          <p className="mb-4 leading-relaxed">
            Our final fine tuned model achieved 0.93 on eval set relative to 0.45 when we started. Plus, the model output valid DSL 100% of the time, and it was 3x faster and 6x cheaper than OpenSearch.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Reflection</h3>

          <p className="mb-4 leading-relaxed">
            I had a lot of fun with this, and plan to continue experimenting with fine tuning in different domains.
          </p>

          <p className="mb-4 leading-relaxed">
            My favorite result is that, as long as your reward function is aligned with your expectations and the task is tractable, there is a decent chance your fine-tuned model will perform well.
          </p>

          <p className="mb-4 leading-relaxed">
            And fine-tuning is now easier than ever - nothing here required more than 200 lines of code, and OpenAI even offers a{" "}
            <a href="https://platform.openai.com/finetune" className="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">
              no-code platform
            </a>{" "}
            that makes it possible to fine tune their models.
          </p>
        </article>

        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Written by <Link href="/" className="underline hover:text-gray-900">Alex Hamidi</Link>
          </div>
          <div className="flex gap-4 text-sm">
            <a href="https://twitter.com/ahamidi_" className="text-gray-600 hover:text-gray-900 underline">Twitter</a>
            <a href="https://github.com/alexhamidi/" className="text-gray-600 hover:text-gray-900 underline">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

