import feedsList from "./feedlist"

export default function handler(req, res) {
  res.status(200).json({ feedsList })
}
