import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import { FaDollarSign } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export const SidebarData = [
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgProfile />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
  },
 
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
  },

];