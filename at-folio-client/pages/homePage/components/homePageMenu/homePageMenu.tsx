import React, { useContext } from "react";

import { HomePageMenuOption } from "./homePageMenuOption";
import { ProfilePhoto } from "../../../../components/profilePhoto/profilePhoto";

import { AppContext } from "../../../../components/app/appWrapper";

import { UserUtility } from "../../../../utilities/userUtility";

export const HomePageMenu: React.FC = () => {  
  const { profile } = useContext(AppContext);

  const getAdminOptions = (): JSX.Element => {
    if(UserUtility.isAdmin(profile)) {
      return (
        <div className="home-page-menu-options-section">
          <HomePageMenuOption 
            description="Manage social platforms"
            icon="fa-regular fa-user-astronaut"
            label="Admin"
            to="/admin" 
          />
        </div>
      )
    }
  }

  return (
    <div id="home-page-menu-wrapper" className="scroll-bar">
      <div id="home-page-menu">
        <div id="home-page-menu-options">
          {getAdminOptions()}
          <div className="home-page-menu-options-section">
            <HomePageMenuOption 
              description="Update your photo, background, and links"
              icon={<ProfilePhoto photo={profile.photo} />}
              label="Profile"
              to="/me" 
            />
            <HomePageMenuOption 
              description="Update your email and password"
              icon="fa-regular fa-user"
              label="Account"
              to="/account"
            />
            <HomePageMenuOption 
              description="See what your page looks like to viewers"
              icon="fa-regular fa-link"
              label="My Link"
              to={`/${profile.username}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}