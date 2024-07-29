import React from "react";

import { Footer } from "../../..";
import Navbar from "../../Component/Navbar/Navbar";
import { Helmet } from "react-helmet";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>{"Discover Our Story | Unzziptruth.com"}</title>
        <meta
          name="description"
          content={
            "Learn about Unzziptruth.com, our mission, and our passion for astrology. Explore our journey to bring truth and insight to your horoscope readings."
          }
        />
        {/* <meta name="keywords" content={blogData?.keywords} /> */}
      </Helmet>

      <Navbar />

      <div className="container">
        <header>
          <h1 style={{ textDecoration: "underline" }} className="wel-text fs-2">
            Welcome to Unzzip Truth
          </h1>
        </header>

        <div>
          <main>
            <section>
              {/* <h2 className="main-h">Unzzip Truth Introduction </h2> */}
              <p className="main-text">
                Welcome to the right platform of astrology that guides you to
                the right path. Unzzip Truth helps you to fulfill your desires
                and achieve true happiness and joy. This platform is like a Pole
                Star that offers insight and guidance through astrology,
                Numerology, and psychic readings. Being rooted with ancient
                wisdom we blend it with modern technology to assist you in
                making the right decisions to acheive your aspirations and
                desires.
              </p>
            </section>
            <section>
              <p className="main-text">
                Individuals are influenced by the cosmic energy that can make
                the path easy or tough towards happiness and fulfillment. With
                us, you can navigate this path without any uncertainty. Our pack
                of expert astrologers would love to offer you deep insight into
                the cosmos world that will shape your lives to get a proper
                growth.{" "}
              </p>
            </section>
            <section>
              <p className="main-text">
                Astrology deeply analyzes cosmic energy and positions that
                influence human nature and their behavior. It guides individuals
                to build their careers in the right field and strengthen their
                relationships as well as improve their personal development.
                Along with astrology, Unzzip Truth offers numerology with the
                correct vibrational energies that come along with numbers.
                Numbers can determine your destiny through a deep analysis, as
                it develops your personality traits and strengths.{" "}
              </p>
            </section>
            <section>
              <p className="main-text">
                Unzzip Truth is the only platform that creates a smooth and
                strong community and connection with its users. Whatever queries
                you have, without any hesitation connect with us through online
                forums, discussion groups, and interactive workshops. There, you
                can share all kinds of experiences, challenges, and emotions
                with us so that we can guide you to the right path of happiness.{" "}
              </p>
            </section>
            <section>
              <p className="main-text" s>
                Unzzip Truth has the true and deep knowledge of an intense
                cosmos world. We help you unlock your hidden secrets to
                achieving your true potential.{" "}
              </p>
            </section>
          </main>
          <footer>
            <p className="main-text">
              &copy; 2024 Unzzip Truth. All rights reserved.
            </p>
          </footer>

          <div style={{}}>
            <div className="container" style={{}}>
              <h2 className="us-text">Contact Us</h2>
              <p>
                <h4 className="add">Address:</h4>
                <p className="add-text">
                  {" "}
                  Floor No.1, Nawada, Dehradun, Uttarakhand, 248005
                </p>
                <h4 className="email">Email : </h4>{" "}
                <p className="email-text">support@unzziptruth.com</p>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
