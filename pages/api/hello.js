export default async function handler(req, res) {
  console.log("req.body", req.body);
  try {
    res.status(200).json({ method: req.method });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: err });
  }
}
