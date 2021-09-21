class UpdateHelper {
  static provideCorrectPayload(schema, payload, previousPayload) {
    const updatedPayload = JSON.stringify(payload);
    const updatedPayloadJson = JSON.parse(updatedPayload);
    let objectPayload = {};

    if (schema === "question") {
      objectPayload = {
        status: updatedPayloadJson.status || previousPayload.status,
        description:
          updatedPayloadJson.description || previousPayload.description,
        options: updatedPayloadJson.options || previousPayload.options,
      };
    } else if (schema === "answer") {
      objectPayload = {
        key: updatedPayloadJson.key || previousPayload.key,
        name: updatedPayloadJson.name || previousPayload.name,
        answer: updatedPayloadJson.answer || previousPayload.answer,
        questionId: updatedPayloadJson.questionId || previousPayload.questionId,
      };
    } else if (schema === "user") {
      objectPayload = {
        role: updatedPayloadJson.role === "admin" ? "admin" : "user",
      };
    }
    return { ...objectPayload, modifiedDate: Date.now() };
  }
}

module.exports = UpdateHelper;
