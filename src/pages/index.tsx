import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Siggraph Funny (we should replace this with NextSEO)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto pt-10">
        You had been trolled...{' '}
        <Link href="/test" className="underline">
          Go funny
        </Link>
      </main>
    </>
  )
}
