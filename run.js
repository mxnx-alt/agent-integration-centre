require("./server");

const fs = require("fs");
const { runPipeline } = require("./runtime/orchestrator");

const pipeline = JSON.parse(
  fs.readFileSync("./pipelines/idea_eval.pipeline.json", "utf8")
);

const input = {
  description: "AI-powered logistics optimization startup",
  urls: ["https://example.com"]
};

// Delay so browser can connect first
setTimeout(() => {
  runPipeline(pipeline, input);
}, 1000);

