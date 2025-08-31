import React from "react";
import Company from './subAbout/Company';
import Director from './subAbout/Director';
import ManagementTeam from './subAbout/ManagementTeam';
import Video from './subAbout/Video';
import Whatsaap from './../Whatsaap';

const AboutPage = () => {
  return (
  <>
   <Company/>
   <Director/>
   <ManagementTeam/>
   <Video/>
   <Whatsaap/>
  </>
  );
};

export default AboutPage;