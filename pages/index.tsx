import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className={"h-screen bg-green-dark text-beige-light flex flex-col items-center"}>
      <Head>
        <title>Deck | tgfnds</title>
        <meta name="description" content="Tracking my steamdeck order progress."/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={"flex-1 flex flex-col items-center justify-center gap-8 text-lg"}>
        <Image src={"/images/steamdeck-logo.png"} width={225 / 4} height={300 / 4} alt={"steamdeck"}/>
        <h1 className={"text-3xl sm:text-6xl"}>Where is my deck?!</h1>
        <p className={"text-xl sm:text-3xl"}>
          <span>{`Current progress: ${10}`}</span>
          <sub>/100</sub>
        </p>
      </main>

      <footer className={"py-2"}>
        <span>Made by </span>
        <a className={"text-brown hover:text-yellow-500"}
           href="https://tgfnds.dev"
           target="_blank"
           rel="noopener noreferrer"
        >
          @tgfnds
        </a>
      </footer>
    </div>
  )
}

export default Home
