import { GraphQLError } from "graphql";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw new notFoundError("No Company found with id: " + id);
      }
      return getCompany(id);
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw new notFoundError("No Job found with id: " + id);
      }
      return getJob(id);
    },
    jobs: () => getJobs(),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
};

const toIsoDate = (value) => value.slice(0, "yyyy-mm-dd".length);

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
};
