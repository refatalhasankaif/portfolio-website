import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import CurrentActivity from "./components/CurrentActivity/CurrentActivity"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects/Projects"
import Skills from "./components/Skills/Skills"
import Home from "./Pages/Home"

function App() {

    return (
        <>
        <Navbar />
            <main>
                <section id="home">
                    <Home />
                </section>
                <section id="skills">
                    <Skills />
                </section>
                <section id="projects">
                    <Projects />
                </section>
                <section id="current-activities">
                    <CurrentActivity />
                </section>
                <section id="about">
                    <About />
                </section>
                <section id="contact">
                    <Contact />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default App
