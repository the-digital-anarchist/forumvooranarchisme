import tinaGit from "@tinacms/api-git"
import { GitClient } from "@tinacms/git-client"
import { useFormScreenPlugin, usePlugin, useCMS } from "tinacms"
import { toMarkdownString, flatDocs, getRandID } from "@utils"
import createAuthHandler from "./create-github-access-token"
import { getGithubFile, NextGithubMediaStore } from "next-tinacms-github"
import { authenticate } from "../../utils/authenticate"
// import { Octokit } from "@octokit/core"
import { Octokit } from "@octokit/rest"

// const baseUrl = `${protocol}//${hostname}${
//     port != '80' ? `:${port}` : ''
//   }/___tina`

//   const client = new GitClient(baseUrl)
//   window.tinacms.registerApi('git', client)
//   window.tinacms.media.store = new GitMediaStore(client)

// async onSubmit(form: FormShape, cms: TinaCMS) {
//     const fileRelativePath = await this.filename(form)
//     const frontmatter = await this.frontmatter(form)
//     const markdownBody = await this.body(form)

// cms.api.github
//   .commit(
//     fileRelativePath,
//     getCachedFormData(fileRelativePath).sha,
//     toMarkdownString({
//       fileRelativePath,
//       frontmatter,
//       markdownBody,
//     }),
//     'Update from TinaCMS'
//   )
//   .then(response => {
//     setCachedFormData(fileRelativePath, {
//       sha: response.content.sha,
//     })
//     if (this.afterCreate) {
//       this.afterCreate(response)
//     }
//   })
//   .catch(e => {
//     return { [FORM_ERROR]: e }
//   })
//   }

import { TinaCMS } from "tinacms"
import { GithubClient } from "react-tinacms-github"

// const githubClient = new GithubClient({
//   proxy: "/api/proxy-github",
//   authCallbackRoute: "/api/create-github-access-token",
//   clientId: process.env.GITHUB_CLIENT_ID,
//   baseRepoFullName: process.env.REPO_FULL_NAME,
// })

// const cms = new TinaCMS({
//   apis: {
//     github: githubClient, // equivalent to cms.registerApi('github', github)
//   },
// })

// const fileRelativePath = `content/blog/test.md`

// const getCachedFormData = (id) => {
//   if (typeof localStorage === "undefined") {
//     return {}
//   }
//   return JSON.parse(localStorage.getItem(id) || "{}")
// }

// const setCachedFormData = (id, data) => {
//   if (typeof localStorage === "undefined") {
//     return
//   }
//   localStorage.setItem(id, JSON.stringify(data))
// }

const frt = `---
date: '2021-06-05T00:00:00Z'
author: Author
description: Eerste post met uitleg over hoe mensen zelf kunnen posten.
title: test node github
---
body
`

// export default async (req, res) => {
//   //   const git = new GitClient("http://localhost:3000/___tina")
//   //   console.log(git.branches())
//   const token = localStorage.getItem("tinacms-github-token") || null
//   cms.api.github
//     .commit(fileRelativePath, getCachedFormData(fileRelativePath).sha, frt, "Update from TinaCMS")
//     .then((response) => {
//       setCachedFormData(fileRelativePath, {
//         sha: response.content.sha,
//       })
//       if (this.afterCreate) {
//         this.afterCreate(response)
//       }
//     })
//     .catch((e) => {
//       return e
//     })

//   console.log(cms.api.github)
//   //   res.status(200).end()
// }

// async function example() {
//   const navigationFile = new GithubFile(cms, "style.json", JSON.parse, JSON.stringify)

//   // get file contents from GitHub
//   const navigation = await navigationFile.fetchFile()

//   // modify the file data
//   navigation.push({ url: "https://tinacms.org", title: "TinaCMS" })

//   // commit the updated file data
//   await navigationFile.commit(navigation, "Update navigation")
// }

// console.log(
//   process.env.GITHUB_CLIENT_ID || "",
//   process.env.GITHUB_CLIENT_SECRET || "",
//   process.env.SIGNING_KEY || ""
// )

const githubOptions = {
  working_repo_full_name: "https://github.com/" + process.env.REPO_FULL_NAME,
  head_branch: "main",
  github_access_token: process.env.GITHUB_ACCESS_TOKEN || "",
  fileRelativePath: "/content/blog/first-blog.md",
}

const client = new GithubClient({
  proxy: "/api/proxy-github",
  authCallbackRoute: "/api/create-github-access-token",
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
  baseBranch: process.env.BASE_BRANCH,
})

export default async (req, res) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })
  //   const { data } = await octokit.request("/user")
  //   console.log(data)

  const owner = "the-digital-anarchist"
  const repo = "forumvooranarchisme"
  //   const ref = 'refs/heads/main'
  const ref = "heads/main"

  //   const branches = await octokit.request("GET /repos/{owner}/{repo}/branches", {
  //     owner: "the-digital-anarchist",
  //     repo: "forumvooranarchisme",
  //   })
  //   console.log(branches)

  // TODO GET sha of main repo latest commit, needed to branch of from
  const fetchedRef = await octokit.rest.git.getRef({
    owner,
    repo,
    ref,
  })
  // Latest sha
  const shaLatestCommit = await fetchedRef?.data?.object?.sha
  console.log(shaLatestCommit)

  let newBranch
  try {
    const newBranchName = `refs/heads/testing-octokit`
    newBranch = await octokit.rest.git.createRef({
      owner,
      repo,
      ref: newBranchName,
      sha: shaLatestCommit,
    })
    console.log("newBranch", newBranch)
  } catch (error) {
    console.log("error", error)
  }

  // // Create or edit file
  // // source: https://octokit.github.io/rest.js/v18#repos-create-or-update-file-contents
  const fileCreated = await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: "content/blog/test-octokitt.md",
    message: "create file",
    content: Buffer.from(frt).toString("base64"),
    committer: {
      name: owner,
      email: "anarwolf@protonmail.com",
    },
    author: {
      name: owner,
      email: "anarwolf@protonmail.com",
    },
  })
  console.log("fileCreated", fileCreated)

  // octokit.request("POST /repos/{owner}/{repo}/pulls", {
  //     mediaType: {
  //     previews: ["shadow-cat"],
  //     },
  //     owner,
  //     repo,
  //     title: "My pull request",
  //     base: "master",
  //     head: "my-feature",
  //     draft: true,
  // });

  //   authenticate(process.env.GITHUB_CLIENT_ID, "/api/create-github-access-token")
  //   const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
  //   await fetch(url).then((response) => {
  //     console.log(response.headers.entries())
  //     console.log(response)
  //   })

  //https://www.forumvooranarchisme.nl/github/authorizing?code=ac36f1c5502a74f4c941&state=polr7h

  //   const handler = createAuthHandler(
  //     process.env.GITHUB_CLIENT_ID,
  //     process.env.GITHUB_CLIENT_SECRET,
  //     process.env.SIGNING_KEY
  //   )
  //   const giveme = await handler(req, res)
  //   console.log(giveme)
  //   console.log(client)
  //   const cms = new TinaCMS({
  //     apis: {
  //       github: client,
  //     },
  //     media: new NextGithubMediaStore(client),
  //   })
  //   const fileRelativePath = `content/blog/first-blog.md`
  //   //   console.log(cms.api.github.commit())

  //   const headers = new Headers()

  //   const response = await fetch(`http://localhost:3000/api/proxy-github`, { headers })
  //   const data = await response.json()
  //   console.log(data)

  //   cms.api.github
  //     .commit(
  //       fileRelativePath,
  //       getCachedFormData(fileRelativePath).sha,
  //       toMarkdownString({
  //         fileRelativePath,
  //         frontmatter,
  //         markdownBody,
  //       }),
  //       "Update from TinaCMS"
  //     )
  //     .then((response) => {
  //       setCachedFormData(fileRelativePath, {
  //         sha: response.content.sha,
  //       })
  //       if (this.afterCreate) {
  //         this.afterCreate(response)
  //       }
  //     })
  //     .catch((e) => {
  //       return { [FORM_ERROR]: e }
  //     })

  //   console.log(createAuthHandler())
  //   const file = await getGithubFile(githubOptions)
  //   console.log(file)
  // working_repo_full_name, head_branch, fileRelativePath, github_access_token, parse,
  //   await example()
  //   res.status(200).end()

  /**
   * Get github token through authenication
   */
  //    const url = `https://github.com/login/oauth/authorize?scope=${scope}&client_id=${clientId}&state=${authState}`
}

/**
 * Get authenitcated with github
 */

//  authenticate() {
//     return authenticate(this.clientId, this.authCallbackRoute, this.authScope)
//   }
