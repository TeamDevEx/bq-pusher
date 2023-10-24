import * as core from '@actions/core'
import { BigQuery } from '@google-cloud/bigquery'

const totalCrq = core.getInput('totalCrq');
const tableId = core.getInput('tableId');
const datasetId = core.getInput('datasetId');
const projectId = core.getInput('projectId');

async function getCRQResult(totalCrq, tableId, datasetId, projectId) {
  try {
    const payload = {
      ingestion_time: moment.utc().format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
      total_crq: totalCrq,
    };

    const bigquery = new BigQuery({ projectId })

    const save = await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert([payload]);

    if (save.length > 0) {
      return "strategies inserted successfully";
    }
  } catch (error) {
    return console.error(`Error getting feature: ${error}`);
  }
}

getCRQResult(totalCrq, tableId, datasetId, projectId);
