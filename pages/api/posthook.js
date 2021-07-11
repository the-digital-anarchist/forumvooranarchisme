import { writeFile } from "fs"
import simpleGit from "simple-git"
import slugify from "slugify"
import { toMarkdownString } from "@utils"
const git = simpleGit({ baseDir: `${process.cwd()}/` })

export function previewLines(text, maxChars = 300, maxLines = 1) {
  return (
    text
      .slice(0, maxChars)
      .split("\n")
      // Use lines * 2 because markdown requires 2 lines
      .slice(0, maxLines * 2)
      .join("\n") + "..."
  )
}

export default async (req, res) => {
  //   console.log(JSON.stringify(req.body, null, 4))
  // res.clearPreviewData()
  //   res.status(200).end()
  //   console.log(JSON.parse(req.body))
  console.log(typeof (await JSON.parse(req.body)))
  const request = await JSON.parse(JSON.parse(req.body))
  console.log(typeof request, request)
  const { op = null, data = null } = request
  console.log(op, data)
  if (op === "CreatePost") {
    const { body, name, published, thumbnail_url, ap_id } = data?.post_view.post
    const { name: author, actor_id } = data?.post_view.creator
    const slug = slugify(name, { lower: true })

    const frontMatter = {
      //   date: `${new Date(published * 1000)}`,
      date: published,
      author: author,
      authorUrl: actor_id,
      title: name,
      description: previewLines(body),
      source: ap_id,
      image: thumbnail_url,
    }

    const markdowenSting = toMarkdownString({
      rawFrontmatter: {
        ...frontMatter,
      },
      rawMarkdownBody: body,
    })

    console.log(markdowenSting)

    writeFile(`${process.cwd()}/content/blog/${slug}.md`, markdowenSting, (err) => {
      if (err) throw err
      console.log("The file has been saved!")
    })

    /**
     * Make branch or branch exist checkout to that branch
     */

    try {
      await git.checkoutBranch(`blog/${slug}`, "main", "-d")
    } catch (exception) {
      console.warn(exception)
      await git.checkout(`blog/${slug}`)
      // await git.checkoutBranch(`blog/${slug}`, "main")
    }

    try {
      // Add all files in blog dir
      await git.add(["content/blog/"])

      // Commit all added files
      await git.commit("Blog post submit")

      // Pull from master (not needed here I think)
      // await git.pull()

      // Push to master
      await git.push("origin", `blog/${slug}`, "--set-upstream")
      // Check out back
      await git.checkout("main")
    } catch (exception) {
      console.warn(exception)
    }
  }

  //   .commit("...").push('origin', 'master');

  // const status = await git.status()
  // console.log(status)

  res.status(200).end()
  //   const requestBuffer = await buffer(req)
  //   console.log(requestBuffer)
}
