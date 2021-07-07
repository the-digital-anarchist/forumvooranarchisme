import Head from "@components/head"
import Layout from "@components/layout"

const Features = () => {
  return (
    <>
      <Layout noContainer={true} noFooter={true}>
        <Head title="Telegram feed" />
        <iframe
          id="preview"
          style={{
            border: "0px",
            flex: "auto",
            width: "100%",
          }}
          data-dark-color="FFFFFF"
          src="https://xn--r1a.website/s/forumvooranarchisme"
        ></iframe>
      </Layout>
    </>
  )
}

export default Features
