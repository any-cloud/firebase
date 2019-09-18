import { PubSub } from "@google-cloud/pubsub";

let pubsub;

export const init = () => {
  pubsub = new PubSub();
};

export const push = async (jobName, args) => {
  const dataBuffer = Buffer.from(JSON.stringify(args));
  await pubsub.topic(jobName).publish(dataBuffer);
  return true;
};
