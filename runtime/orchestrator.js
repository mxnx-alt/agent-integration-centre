const { emit } = require("../agui/emitter");
const { AGUI_EVENTS } = require("../agui/events");

async function runPipeline(pipeline, input) {
  emit({
    type: AGUI_EVENTS.STATE_UPDATE,
    state: "queued"
  });

  emit({
    type: AGUI_EVENTS.STATE_UPDATE,
    state: "running"
  });

  const output = {
    summary: "",
    score: 0,
    strengths: [],
    risks: [],
    next_actions: []
  };

  for (const step of pipeline.steps) {
    emit({
      type: AGUI_EVENTS.PARTIAL_OUTPUT,
      message: `Running step: ${step.id}`
    });

    if (step.policy && step.policy.requires_approval) {
      emit({
        type: AGUI_EVENTS.APPROVAL_REQUEST,
        step_id: step.id,
        message: "Approval required to continue"
      });

      // wait for ENTER (temporary stand-in for real UI)
      await new Promise((resolve) =>
        process.stdin.once("data", resolve)
      );
    }

    // Fake evaluation logic
    if (step.id === "evaluation") {
      output.summary =
        "AI-driven logistics optimization startup.";
      output.score = 7.5;
      output.strengths.push("Clear problem", "Large market");
      output.risks.push("Competitive space");
      output.next_actions.push("Pilot with customers");
    }
  }

  emit({
    type: AGUI_EVENTS.COMPLETED,
    output
  });

  return output;
}

module.exports = { runPipeline };

