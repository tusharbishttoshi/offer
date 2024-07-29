import React, { useState } from "react";
import styles from "./Faq.module.css";
import { NavBar } from "../../Component/All";

import Navbar from "../../Component/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { Footer } from "../../..";
import { Helmet } from "react-helmet";

const a = [
  {
    id: 1,
    q: "What is UnzzipTruth?",
    a: "UnzzipTruth is a comprehensive platform dedicated to exposing myths and spreading truth. Our mission is to provide accurate information on a wide range of topics to empower individuals to make informed decisions. A platform where individuals can engage in meaningful conversations with experienced astrologers, seeking guidance and insights into various aspects of life. Through real-time chat sessions, users can ask questions, explore astrology-based insights, and receive personalized advice tailored to their specific needs and inquiries. Unzzip Truth aims to provide a reliable and convenient space for individuals to access astrological wisdom and enhance their understanding of themselves and the world around them.",
  },
  {
    id: 2,
    q: "How does UnzzipTruth work?",
    a: "Unzzip Truth operates as a chat platform connecting users with experienced astrologers. Upon entering the platform, users can engage in real-time chat sessions or can leave the questions with our vetted astrologers. Our intuitive interface allows for seamless communication, enabling users to ask questions, seek guidance, and explore astrology-based insights. Our astrologers, carefully selected for their expertise and dedication to serving our users, provide personalized responses and advice tailored to each individual's needs and inquiries. Whether you're seeking clarity on life decisions, insights into relationships, or guidance on future endeavors, Unzzip Truth offers a convenient and reliable platform for accessing astrological wisdom.",
  },
  {
    id: 3,
    q: "Is the Horoscope section free for every user?",
    a: "Yes, absolutely! We believe everyone deserves access to astrological insights. Our Horoscope section is completely free for every user, providing daily, weekly, and monthly horoscopes tailored to your zodiac sign.",
  },
  {
    id: 4,
    q: "How can I access the Horoscope section?",
    a: "Accessing your personalized horoscope is easy! Simply navigate to the Horoscopy section on our platform, select your zodiac sign, and explore the latest insights and predictions.",
  },
  {
    id: 5,
    q: "Do I need to pay for live chat sessions or offline questions with astrologers?",
    a: "Yes, while our Horoscope section is free for every user, live chat sessions and offline questions with our experienced astrologers are available for a fee. We strive to provide quality astrological guidance tailored to your specific needs through our paid services.",
  },

  {
    id: 6,
    q: "How do I schedule a live chat session or submit an offline question?",
    a: "To schedule a live chat session or submit an offline question, simply navigate to the 'Chat with Astrologer' or ‘Psychic Masters’ section on our platform. From there, you can choose your preferred astrologer, select your desired service, and proceed with payment. Our astrologers are ready to provide personalized guidance and insights to help you navigate life's challenges.",
  },
  {
    id: 7,
    q: "Why to use Unzzip Truth?",
    a: "Our platform carefully selects astrologers based on their expertise and commitment to serving users with integrity and compassion .However, it's essential to approach any psychic readings with a critical mindset and be aware that not all practitioners may have genuine abilities. Some may exploit vulnerable individuals for financial gain. It's crucial to research and choose reputable and ethical practitioners if one decides to engage with any psychic reader. At Unzzip Truth, we're dedicated to connecting you with genuine, reliable, and experienced psychic readers at affordable rates. Our rigorous selection process ensures that only the most qualified practitioners join our platform, each driven by a genuine desire to serve humanity rather than financial gain. Lastly, Unzzip Truth diligently monitors each psychic expert, ensuring transparent methodologies and prioritizing the well-being of every individual, all aimed at enhancing our users' lives.",
  },
  {
    id: 8,
    q: "When to Use Unzzip Truth?",
    a: "Seeking Guidance: When you feel to seek guidance during challenging times or when faced with important decisions. Psychic readers at Unzzip Truth can provide you with insights and advice that can help individuals navigate through life's uncertainties. Curiosity about life:  When you are simply curious about what the future holds for you or intrigued by the idea of psychic abilities. Unzzip Truth's psychic readers can help you out. Validation:  Those who believe in psychic abilities can receive validation or confirmation from a psychic reader of Unzzip Truth. Here our psychic masters can provide reassurance about their feelings, intuitions, or life choices. Entertainment: Just like reading horoscopes or watching fortune-telling shows, consulting psychic readers can be a form of entertainment for you. It's a way to engage with mystical or spiritual concepts for amusement. Closure:  In cases of grief or loss, you can turn to psychic masters of Unzzip Truth in hopes of connecting with departed loved ones or finding closure. Some of our master's are great Mediums which can help you in closure. Exploration of Spirituality:  Psychic masters at Unzzip Truth can be part of a broader exploration of spirituality. They can help you view spirituality as a tool for self-discovery or understanding your place in the universe.",
  },
  {
    id: 9,
    q: "Which tools do Psychic Masters use?",
    a: "Astrology:  Vedic Astrology, Western Astrology, Krishnamurti Paddhati (K.P.), Lal Kitab Jyotish, Nadi Astrology.. Tarot Cards: A deck of cards with symbolic imagery that can be interpreted by the reader to gain insights into past, present, and future events.Numerology: The study of numbers and their symbolic meanings to interpret personality traits, life paths, and future events.Psychic Readings: Utilizing intuition and extrasensory perception (ESP) to provide insights and guidance on various aspects of life, including relationships, career, and personal development.Aura Dowsing: Sensing and interpreting the energy fields or auras surrounding individuals to gain insights into their emotional, mental, and spiritual states.Crystal Ball Gazing: Using a crystal ball to focus and enhance psychic abilities, allowing the reader to receive images or impressions related to the client's questions or concerns.Palmistry: Analyzing the lines, shapes, and markings on a person's palms to gain insights into their personality, potential future events, and life path.Mediumship: Communicating with spirits or entities from the spiritual realm to provide messages, guidance, or closure to clients seeking to connect with departed loved ones.These tools and methodologies serve as channels for psychic masters to access information and insights beyond the realm of ordinary perception, offering  guidance, clarity, and validation in the lives of the clients of Unzzip Truth.",
  },
  {
    id: 10,
    q: "How can I reach to Unzzip Truth, If I do have some specific concern with readings?",
    a: "Our clients can reach us any time by doing mail at account@unzziptruth.com or support@unzziptruth.com ",
  },
];

export default function FrequentlyAsk() {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const stateValue = location?.pathname;
  // const faqItems = stateValue === "/faq" ? faqData : faqData.slice(0, 5);
  const faqData = stateValue === "/faq" ? a : a.slice(0, 4);

  console.log({ stateValue });

  return (
    <>
      <Helmet>
        <title>{"Get Answers to Your Questions | Unzziptruth.com"}</title>
        <meta
          name="description"
          content={
            "Find solutions to common queries and learn more about Unzziptruth.com with our comprehensive FAQ section. Simplify your experience today"
          }
        />
        {/* <meta name="keywords" content={blogData?.keywords} /> */}
      </Helmet>

      <Navbar />
      <div className={styles.container} id="faq">
        <h2 className="as_heading">Frequently Asked Questions</h2>
        <div className={styles.accordion}>
          {a.map((e) => (
            <div className={styles.accordion_item} key={e.id}>
              <button
                id={`accordion-button-${e.id}`}
                aria-expanded={active === e.id ? true : false}
                onClick={() => setActive(active === e.id ? 0 : e.id)}
              >
                <span
                  className={styles.accordion_title}
                  style={{ fontSize: "1.3rem" }}
                >
                  {e.q}
                </span>
                <span className={styles.icon} aria-hidden="true"></span>
              </button>
              <div
                className={styles.accordion_content}
                style={{
                  height: active === e.id ? "auto" : "0px",
                  overflow: "hidden",
                  transition: "height 0.3s ease",
                }}
              >
                <p style={{ fontSize: "1.2rem" }}>{e.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
