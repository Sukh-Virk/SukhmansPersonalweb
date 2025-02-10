import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import myImage from "./asset/unnamed.jpg";
import screenImage from "./asset/screen.png";
import GithubStatsChart from "./GithubStatsChart.js";
import ContactForm from "./Contact";

function App() {
  const sentences = [
    {
      text: "Hello, my name is Sukhman and I go to SFU :) Welcome to my website!",
      action: null,
    },
    {
      text: "Let’s change the background. Simple, right? 🌈",
      action: "fakeBackgroundFail",
    },
    { text: "Uh... why isn’t this working??!@#$%", action: "errorShake" },
    { text: "Oops, forgot a semicolon. 💀💀💀", action: "errorFlash" },

    {
      text: "Aced Calculus 1 and 2, and took Calculus 3 just for fun!. 🕹️",
      action: "calculusFlex",
    },
    {
      text: "MACM? Light work. Seems like AI won't be replacing me anytime soon. 💀🤖. 🧩",
      action: "macmJoke",
    },
    { text: "Let’s make the text bounce. 🏀", action: "bounceText" },
    { text: "And... SPIN! 🌀", action: "spinText" },

    {
      text: "Okay okay, let me get serious. 🔒",
      action: "prepareWebsite",
    },
    {
      text: "Building something professional now... 🛠️",
      action: "buildWebsite",
    },
  ];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [actionTriggered, setActionTriggered] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const textElementRef = useRef(null);

  const milestones = [
    {
      date: "01/2021",
      text: "Sukhman took his first programming class  at Queen Elizabeth Secondary.",
    },
    {
      date: "09/2022",
      text: "He enrolled in CMPT 125 and learned the basics of programming.",
    },
    {
      date: "01/2023",
      text: "Sukhman started CMPT 225 with David Mitchell, mastering data structures.",
    },
    {
      date: "09/2023",
      text: "He took CMPT 310 (AI) and CMPT 353 (Data Science) to push his skills further.",
    },
    {
      date: "02/2025",
      text: "Currently, Sukhman is expanding his knowledge in AI and data science while building cool projects.",
    },
    {
      date: "??????",
      text: "Stay tuned... Sukhman's journey is just beginning!",
    },
  ];

  const [userInput, setUserInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([
    "Welcome to the Terminal... Type 'git push' to explore Sukhman's journey.",
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isTyping) {
      if (userInput.toLowerCase() === "git push") {
        processMilestone();
      } else {
        setTerminalOutput((prev) => [
          ...prev,
          `$ ${userInput}`,
          "Command not recognized. Try 'git push'.",
        ]);
        setUserInput("");
      }
    }
  };

  const simulateTyping = (text, callback) => {
    let index = 0;
    const speed = 50; // Adjust typing speed here

    const typeCharacter = () => {
      if (index < text.length) {
        setTerminalOutput((prev) => {
          const newOutput = [...prev];
          const lastLine = newOutput[newOutput.length - 1] || "";
          newOutput[newOutput.length - 1] = lastLine + text.charAt(index);
          return newOutput;
        });
        index++;
        setTimeout(typeCharacter, speed);
      } else {
        setTerminalOutput((prev) => [...prev, ""]);
        if (callback) callback();
      }
    };

    setTerminalOutput((prev) => [...prev, ""]); // Add an empty line
    typeCharacter();
  };

  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

  const processMilestone = () => {
    if (currentMilestoneIndex < milestones.length) {
      const milestone = milestones[currentMilestoneIndex];
      setIsTyping(true);
      simulateTyping(`$ git push`, () => {
        simulateTyping(`[commit ${milestone.date}] ${milestone.text}`, () => {
          setIsTyping(false);
          setCurrentMilestoneIndex((prev) => prev + 1); // Move to the next milestone
          setUserInput("");
        });
      });
    } else {
      setTerminalOutput((prev) => [...prev, "No more milestones."]);
      setUserInput("");
    }
  };

  useEffect(() => {
    if (showWebsite) return;

    let timeout;
    const currentSentence = sentences[currentSentenceIndex]?.text || "";

    if (!isDeleting) {
      if (displayedText.length < currentSentence.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentSentence.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        if (!actionTriggered) {
          performAction(sentences[currentSentenceIndex]?.action);
          setActionTriggered(true);
        }
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentSentence.slice(0, displayedText.length - 1));
        }, speed / 1.5);
      } else {
        setIsDeleting(false);
        setActionTriggered(false);
        if (currentSentenceIndex + 1 < sentences.length) {
          setCurrentSentenceIndex((prev) => prev + 1);
        } else {
          setShowWebsite(true);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    currentSentenceIndex,
    sentences,
    speed,
    actionTriggered,
    showWebsite,
  ]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const performAction = (action) => {
    const textElement = textElementRef.current;
    const body = document.body;

    if (!textElement) return;

    switch (action) {
      case "gradientBackground":
        body.classList.add("gradientBackground");
        break;
      case "errorShake":
        textElement.classList.add("shake");
        break;
      case "glowText":
        textElement.classList.add("glow");
        break;
      case "bounceText":
        textElement.classList.add("bounce");
        break;
      case "spinText":
        textElement.classList.add("spin-once");
        break;
      default:
        console.warn(`⚠️ Unknown action: ${action}`);
    }
  };

  const skipToWebsite = () => setShowWebsite(true);

  return (
    <div>
      {!showWebsite ? (
        <div className="container">
          <h1 ref={textElementRef} className="typing-animation">
            {displayedText}
            <span className="cursor">|</span>
          </h1>
          <button className="skip-button" onClick={skipToWebsite}>
            Skip to Website 🚀
          </button>
        </div>
      ) : (
        <>
          {/* 🧭 Navigation */}
          <nav>
            <h1 className="logo">Sukhman</h1>
            <ul>
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#stats">Stats</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          {/* 🏠 Hero Section */}
          <section id="hero" className="hero">
            <div className="hero-content">
              <h1>Hello, I’m Sukhman</h1>
              <img src={myImage} alt="Sukhman" className="hacker-glitch" />

              <p>Other people see code. I see poetry in motion.</p>

              <div className="buttons">
                <a href="#contact" className="button button-primary">
                  Hire Me 🚀
                </a>
                <a href="#projects" className="button button-secondary">
                  My Work 📂
                </a>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="theme-toggle"
              >
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>

            <div className="hero-image"></div>
          </section>
          <section id="about">
            <h2 className="glitch-text" data-text="About Me">
              About Me
            </h2>
            <img
              src={screenImage}
              alt="Screen Image"
              className="distorted-image"
            />

            <div className="about-section">
              <div className="about-part">
                <h3>🎓 School</h3>
                <p>I’m a student at SFU pursuing Computer Science.</p>
              </div>
              <div className="about-part">
                <h3>📚 Grades</h3>
                <p>
                  Strong performance: A in MACM, A+ in Calculus 1-3 and other
                  cmpt courses.
                </p>
              </div>
              <div className="about-part">
                <h3>🌟 Future Plans</h3>
                <p>
                  Career goals: Cybersecurity, DevOps, or software engineering.
                </p>
              </div>

              {/* Terminal Simulation */}
              <div className="terminal">
                <h3 className="terminal-title">Sukhman's Terminal</h3>
                {terminalOutput.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                <div className="input-line">
                  <span className="prompt">$</span>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    disabled={isTyping}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="experience">
            <section id="experience">
              <h2 className="fire-text"> Experience & Skills </h2>
            </section>

            <div className="experience-section">
              <div className="large-card">
                <h3>💻 Web Development</h3>
                <p>
                  Built interactive web apps using React.js with custom
                  components, API integration, and responsive design. Developed
                  a meal planning app using Spoonacular API for personalized
                  meal suggestions.
                </p>
                <span>Tools: React.js, JavaScript, CSS, Spoonacular API</span>
              </div>
              <div className="large-card">
                <h3>📊 Data Visualization</h3>
                <p>
                  Visualized large datasets using Pandas and Matplotlib to
                  uncover trends and insights. Worked on Wikipedia page view
                  analysis with interactive visualizations.
                </p>
                <span>Tools: Python, Pandas, Matplotlib</span>
              </div>
              <div className="large-card">
                <h3>🎮 Bot Development</h3>
                <p>
                  Developed a game bot in Python for Discord servers.
                  Implemented trivia games and server management features with
                  real-time interaction.
                </p>
                <span>Tools: Python, Discord API</span>
              </div>
              <div className="large-card">
                <h3>🛠️ DevOps & CI/CD</h3>
                <p>
                  Configured continuous integration and deployment pipelines
                  using GitHub Actions. Automated testing and deployment for web
                  projects.
                </p>
                <span>Tools: GitHub Actions, Jest, Supertest</span>
              </div>
            </div>
          </section>

          <section id="tech-stack" className="tech-stack-section">
            <h2>My Tech Stack</h2>
            <div className="cube-container">
              <div className="cube">
                <div className="cube-face cube-face-front">JavaScript</div>
                <div className="cube-face cube-face-back">Python</div>
                <div className="cube-face cube-face-left">React.js</div>
                <div className="cube-face cube-face-right">CSS</div>
                <div className="cube-face cube-face-top">HTML</div>
                <div className="cube-face cube-face-bottom">Node.js</div>
              </div>
            </div>
          </section>

          <section id="stats">
            <h2 className="glitch-text1" data-text="GitHub Stats">
              GitHub Stats
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                color: darkMode ? "#c9d6ff" : "#37474f",
              }}
            >
              Feel free to follow me on GitHub! These are live stats from my
              GitHub profile. 📊✨
            </p>
            <GithubStatsChart theme={darkMode ? "dark" : "light"} />

            {/* Pass the theme */}
          </section>

          <section id="contact">
            <h2>Contact Me</h2>
            <p>
              Feel free to reach out for collaborations or just to say hello!
            </p>
            <ContactForm />
          </section>

          <footer
            className={`footer ${darkMode ? "dark-footer" : "light-footer"}`}
          >
            <p>
              Made with 💻 by <strong>Sukhman</strong> | Follow me on{" "}
              <a
                href="https://www.instagram.com/sukhman_virk16/?hl=tr"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </p>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
