const RunState = {
  QUEUED: "queued",
  RUNNING: "running",
  NEEDS_APPROVAL: "needs_approval",
  COMPLETED: "completed",
  FAILED: "failed"
};

async function runPipeline(pipeline, input) {
  console.log(RunState.QUEUED);
  console.log(RunState.RUNNING);

  // 🔹 Structured output object
  const output = {
    summary: "",
    score: 0,
    strengths: [],
    risks: [],
    next_actions: []
  };

  for (const step of pipeline.steps) {
    console.log(`Running step: ${step.id}`);

    // 🔸 Human approval step
    if (step.policy && step.policy.requires_approval) {
      console.log(RunState.NEEDS_APPROVAL);
      console.log("Approval required. Press ENTER to continue...");
      await new Promise((resolve) =>
        process.stdin.once("data", resolve)
      );
    }

    // 🔸 Fake evaluation logic (placeholder for AI later)
    if (step.id === "evaluation") {
      output.summary =
        "This startup aims to optimize logistics operations using AI-driven route and cost optimization.";
      output.score = 7.5;
      output.strengths.push(
        "Clear operational problem",
        "Large logistics market"
      );
      output.risks.push(
        "Crowded market",
        "High integration cost"
      );
      output.next_actions.push(
        "Run pilot with 2–3 logistics partners",
        "Validate cost savings"
      );
    }
  }

  console.log(RunState.COMPLETED);
  return output;
}

module.exports = { runPipeline };

