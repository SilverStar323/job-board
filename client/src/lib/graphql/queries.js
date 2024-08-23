import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

export const getCompany = async (id) => {
  const query = gql`
    query ($id: ID!) {
      company(id: $id) {
        id
        name
        description
      }
    }
  `;
  const { company } = await client.request(query, { id });
  return company;
};

export const getJob = async (id) => {
  const query = gql`
    query ($id: ID!) {
      job(id: $id) {
        id
        date
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const { job } = await client.request(query, { id });
  return job;
};

export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { jobs } = await client.request(query);
  return jobs;
};
