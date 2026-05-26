import React from "react";
import LogoDry from "./LogoDry";
import DryWatter from "./DryWatter";

const ContentLanding = () => {
  return (
    <div className='content--landing px-md '>
      <div className='inner'>
        {/* <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "50%",
            backgroundColor: "#FF6680", // Rose du bas
            mixBlendMode: "multiply",
            opacity: 0,
          }}
        /> */}

        <div className='header'>more coming soon…</div>
        <LogoDry />
        <div className='footer'>
          <p>
            {" "}
            <strong>dry festival</strong>
          </p>
          <p>in nouveau salon entièrement dédié aux boissons sans alcool</p>
          <p>
            9, 10 + 11 Janvier 2027 | Carreau du Temple, Paris |{" "}
            <a href='mailto:bonjour@dryfestival.com'>bonjour@dryfestival.com</a>
          </p>
        </div>
        <DryWatter />
      </div>
    </div>
  );
};

export default ContentLanding;
