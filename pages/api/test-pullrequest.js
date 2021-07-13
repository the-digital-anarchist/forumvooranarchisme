import { Octokit } from "@octokit/core"
import { createPullRequest } from "octokit-plugin-create-pull-request"

const MyOctokit = Octokit.plugin(createPullRequest)

const TOKEN = process.env.GITHUB_ACCESS_TOKEN // create token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new MyOctokit({
  auth: TOKEN,
})

export default async (req, res) => {
  //   console.log(octokit)

  // Returns a normal Octokit PR response
  // See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
  await octokit
    .createPullRequest({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.REPO,
      title: "pull request title",
      body: "pull request description",
      base: "main" /* optional: defaults to default branch */,
      // `my-branch-${Date.now()}`
      head: "pull-request-branch-name",
      changes: [
        {
          /* optional: if `files` is not passed, an empty commit is created instead */
          files: {
            "content/blog/file1.md": frt,
            // "path/to/file2.png": {
            //   content: frt,
            //   encoding: "base64",
            // },
            // deletes file if it exists,
            // "path/to/file3.txt": null,
            // updates file based on current content
            // updating file4.txt (if it exists)
            // "path/to/file4.txt": ({ exists, encoding, content }) => {
            //   // do not create the file if it does not exist
            //   if (!exists) return null

            //   return Buffer.from(content, encoding).toString("utf-8").toUpperCase()
            // },
          },
          commit: "creating file1.md",
        },
      ],
    })
    .then((pr) => console.log(pr.data.number))

  //   res.status(200).end()
}
