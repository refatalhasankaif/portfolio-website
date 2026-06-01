import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import CurrentActivity from "./components/CurrentActivity/CurrentActivity"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects/Projects"
import SEO from "./components/SEO"
import Services from "./components/Services/Services"
import Skills from "./components/Skills/Skills"
import Home from "./Pages/Home"

function App() {

    return (
        <>
            <SEO
                title="Md. Refat Al Hasan Kaif | Full-Stack Developer Bangladesh"
                description="Full-Stack Developer from Rajshahi, Bangladesh offering landing page development, Figma to React/Next.js conversion, AI website fixes, MERN/PERN web applications, responsive website development, and website redesign services for international freelance clients."
                canonical="https://refatalhasan.com"
            />
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
                <section id="services">
                    <Services />
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
