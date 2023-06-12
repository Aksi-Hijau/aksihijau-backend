const { object, string } = require("yup");

const createReportSchema = object({
  body: object({
    title: string().required("Title is required"),
    body: string().required("Body is required"),
  })
})

const ReportSchema = {
  createReportSchema
}

module.exports = ReportSchema