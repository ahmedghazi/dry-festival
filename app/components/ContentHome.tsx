import React from "react";
import { Home } from "../types/schema";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  return <div className='content--home px-md '>ContentHome</div>;
};

export default ContentHome;
