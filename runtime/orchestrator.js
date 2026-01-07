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

  for (const step of pipeline.steps) {
    console.log(`Running step: ${step.id}`);

    if (step.policy && step.policy.requires_approval) {
      console.log(RunState.NEEDS_APPROVAL);
      console.log("Approval required. Press ENTER to continue...");
      await new Promise((resolve) =>
        process.stdin.once("data", resolve)
      );
    }
  }

  console.log(RunState.COMPLETED);
}

module.exports = { runPipeline };

