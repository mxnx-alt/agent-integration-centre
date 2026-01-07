const fs = require("fs");
const { runPipeline } = require("./runtime/orchestrator");

const pipeline = JSON.parse(
  fs.readFileSync("./pipelines/idea_eval.pipeline.json", "utf8")
);

const input = {
  description: "AI-powered logistics optimization startup",
  urls: ["https://example.com"]
};

runPipeline(pipeline, input).then((output) => {
  console.log("\nFINAL OUTPUT:");
  console.log(JSON.stringify(output, null, 2));
});


