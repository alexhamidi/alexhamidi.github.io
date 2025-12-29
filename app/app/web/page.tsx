import Link from "next/link";

export default function WebPage() {
  return (
    <div className="flex flex-col items-center text-gray-900 font-mono overflow-x-hidden">
      <div className="flex flex-col gap-8 max-w-[700px] px-5 mb-12">
        <div className="flex items-center justify-between mt-8 mb-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 underline">
            ← back to home
          </Link>
          <div className="text-xs text-gray-500">October 2025</div>
        </div>

        <article className="text-sm">
          <h1 className="text-3xl font-bold mb-6">Building Umari</h1>

          <h3 className="text-xl font-semibold mt-8 mb-4">Motivation</h3>

          <p className="mb-4 leading-relaxed">
            Reasoning models are great at planning—they can decompose &quot;book a flight to NYC&quot; into search, filter, and purchase steps. But executing these plans requires grounding actions to pixel coordinates, which is a fundamentally different problem.
          </p>

          <p className="mb-4 leading-relaxed">
            Planning is discrete and semantic: you decide <em>what</em> to click. Grounding is continuous and spatial: you find <em>where</em> to click. Using a reasoning model for both wastes compute on the grounding task, which doesn&apos;t benefit from chain-of-thought.
          </p>

          <p className="mb-4 leading-relaxed">
            The cost compounds quickly. Vision models process screenshots as tiles—a 1920×1080 screen is ~1000 tokens. For a 100-step workflow, this costs $3-9 without caching. At scale, calling a reasoning model repeatedly for coordinate prediction becomes expensive.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Architecture</h3>

          <p className="mb-4 leading-relaxed">I decomposed the system into two specialized models:</p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li><strong>Planning:</strong> Vision-language model generates semantic actions from screenshots</li>
            <li><strong>Grounding:</strong> Specialized model maps semantic actions to pixel coordinates</li>
          </ol>

          <p className="mb-4 leading-relaxed">
            Given a screenshot s_t and history h_t, the planner outputs action a_t. The grounding model converts semantic actions to coordinates (x, y).
          </p>

          <p className="mb-4 leading-relaxed">Example output:</p>

          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4 text-sm">
            <code>{`{
  "action": "click",
  "target": "Submit button",
  "coordinates": [834, 672],
  "confidence": 0.94
}`}</code>
          </pre>

          <h3 className="text-xl font-semibold mt-8 mb-4">Cost Analysis</h3>

          <p className="mb-4 leading-relaxed">
            Vision-language models tile screenshots for processing. A 1920×1080 screen generates 6 tiles at 170 tokens each.
          </p>

          <p className="mb-4 leading-relaxed">For a 100-step workflow:</p>

          <table className="min-w-full border-collapse border border-gray-300 my-6 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 font-semibold text-left">Metric</th>
                <th className="border border-gray-300 px-4 py-2 font-semibold text-left">Without Caching</th>
                <th className="border border-gray-300 px-4 py-2 font-semibold text-left">With Caching</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Cost</td>
                <td className="border border-gray-300 px-4 py-2">$3.20–$9.40</td>
                <td className="border border-gray-300 px-4 py-2">$0.32–$0.94</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Latency per action</td>
                <td className="border border-gray-300 px-4 py-2">2–5 seconds</td>
                <td className="border border-gray-300 px-4 py-2">10–50ms</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Total time</td>
                <td className="border border-gray-300 px-4 py-2">3–8 minutes</td>
                <td className="border border-gray-300 px-4 py-2">1–5 seconds</td>
              </tr>
            </tbody>
          </table>

          <p className="mb-4 leading-relaxed">
            The optimization strategy is to cache UI elements between actions and route simple interactions directly to the grounding model. UI state changes slowly—most elements remain at fixed coordinates across consecutive actions.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Training</h3>

          <p className="mb-4 leading-relaxed">
            I trained the grounding model via GRPO (Group Relative Policy Optimization) with binary rewards. Training uses trajectory augmentation: one recorded workflow generates multiple training samples by varying UI states and timing.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Adaptive Routing</h3>

          <p className="mb-4 leading-relaxed">
            For simple UIs, the grounding model executes directly without planning. I route to the planner only when confidence is low.
          </p>

          <p className="mb-4 leading-relaxed">
            This achieves ~50ms latency on simple actions (A100), escalating to 2-5s only for ambiguous cases.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Future Work</h3>

          <p className="mb-4 leading-relaxed">
            The current implementation processes discrete states. Moving to streaming would enable continuous perception-action loops at 5-10 Hz, handling dynamic interactions (drag, hover, scroll) more naturally.
          </p>

          <p className="mb-4 leading-relaxed">
            For repeated workflows, policy distillation could compile trajectories into specialized models. This converts the planner from runtime dependency to training-time teacher, enabling local execution of routine tasks.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Related Work</h3>

          <div className="text-xs text-gray-600 leading-relaxed">
            <p className="mb-2">
              He, Y., Jin, J., & Liu, P. (2025).{" "}
              <a href="https://gair-nlp.github.io/PC-Agent-E/" target="_blank" rel="noopener noreferrer" className="underline text-gray-700 hover:text-gray-900">
                Efficient Agent Training for Computer Use
              </a>. <em>arXiv preprint arXiv:2505.13909</em>.
            </p>
            <p className="mb-2">
              Yang, Y., Li, D., Dai, Y., Yang, Y., Luo, Z., Zhao, Z., Hu, Z., Huang, J., Saha, A., Chen, Z., Xu, R., Pan, L., Xiong, C., & Li, J. (2025).{" "}
              <a href="https://arxiv.org/abs/2507.05791" target="_blank" rel="noopener noreferrer" className="underline text-gray-700 hover:text-gray-900">
                GTA1: GUI Test-time Scaling Agent
              </a>. <em>arXiv preprint arXiv:2507.05791</em>.
            </p>
          </div>
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

