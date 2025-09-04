# building SoTA people search @ Clado

### Background

A few months ago, I joined [Clado](https://clado.ai/) as a software engineer. My internship has since ended, but I wanted to share a bit about some of my biggest contributions to clado’s people search engine, which performs [better than all competitors](https://pbs.twimg.com/media/GwLWi2lWoAAGpOc?format=jpg&name=medium) on [pearch.ai’](https://pearch.ai/)s sourcing [benchmark](https://arxiv.org/pdf/2504.02463). 

As a primer: Our search is criteria based, and users can search through 100+ fields across 1B+ profiles in a single query. We achieve this at scale by decomposing the search problem into two parts:

1. generate a database query based on the user’s input 
2. filter returned profiles in parallel using large language models.

### Creating a new Query Language

Around 1 week in, we migrated our database from a MySQL to OpenSearch. After running a set of evals, I found that most open models (in the 18b-32b parameter range) struggled to generate valid OpenSearch queries, primarily because of how much more verbose and complex it was than SQL.

 For reference, here is an SQL query corresponding to the search “Find me software engineers in SF”:

```sql
SELECT *
FROM people
WHERE 
  ( -- this is "criteria 1"
    location LIKE '%SF%'
    OR location LIKE '%San Francisco%' 
  )
  AND ( -- this is "criteria 2"
    current_company_title LIKE '%Software Engineer%'
    OR past_company_title LIKE '%Software Engineer%'
  );
```

And here is the OpenSearch equivalent:

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "bool": { // this is "criteria 1"
            "should": [
              { "match_phrase": { "location": "SF" } },
              { "match_phrase": { "location": "San Francisco" } }
            ],
            "minimum_should_match": 1
          }
        }
      ],
      // this is "criteria 1"
      "should": [
        { "match_phrase": { "current_company_title": "Software Engineer" } },
        { "match_phrase": { "past_company_title": "Software Engineer" } }
      ],
      "minimum_should_match": 1
    }
  }
}
```

Opensearch queries are 4x more tokens on average, which translated directly to inference costs. 

With these problems, I realized something exciting: I could create a *completely new* language that was optimized for our criteria-based searches, and then interpret that to any query language, whether it be SQL, OpenSearch, etc.

We would no longer need to retrain models for each new language, and I could experime

The language had a few requirements:

1. *maximally* *expressive*, meaning it could represent ANY possible query a user might make
2. *maximally concise* - to reduce token spend, inference time, and failure probability
3. python based - to make it easier to parse

Now, I know what you may be thinking. the strong *priors* of the model would . its basic intu

### Postraining

**how posttrainnig**

as a brie overview, lets talk about 

SFT means

RL, is just .. you provide a reward functoin

Going into …, I had no exprctations ofwhat

The obcious downside of .. is htthat ..

The LLM has likely seen millions if not billionso f example of sQL in its training cop

was simple - jut LLM as a judge. we used

<<talk about novel reward function>>

```latex
quantityff = tanhsf
ff
```

in order to prevent bias toward:

```jsx
....
```

tabase query based on the user’s input

at this point, we ha already 2 separate posttrained models, and decided to switch into to ElasticSearch since it’s full text search was stronger & faster than SQL. However, this would mean. to make sure we

however, we found that this is *not* the case with small models you are posttraining. this was one of the most important realizations i had at clado. 

were dual. little segue to talk about RL

lower hallucination

- fine tuning, deciding reward function (make it sound as mathy/research as possible)

building

- eval model
- final ree

now, … . we suggest, and stay posted for any BIg updates for the clado team :)

### Reflecition

That you can use RL to teach small language models to do arbitrary tasks well. 

This is particularly exciting because

citations:
