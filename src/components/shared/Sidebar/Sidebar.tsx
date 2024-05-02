"use client";

import React, { CSSProperties, useState } from "react";
import styles from "./sidebar.module.css";
import { useMenus } from "@/context/SideBarMenuItemsProvider";
import { TabTypes } from "@/types/SideBarTypes";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";

const Sidebar = () => {
  const { rootMenus } = useMenus();

  return (
    <div className={`${styles.sideBar}`}>
      <h2>
        Super Tokens Sidebar
        <br />
        Clone
      </h2>
      <div className={`${styles.menu}`}>
        <MenuList menus={rootMenus} data-depth={1} slugs={[]} key={"root"} />
      </div>
    </div>
  );
};
type MenuList = {
  ["data-depth"]: number;
  menus: TabTypes[];
  slugs?: string[];
};
const MenuList = ({ menus, "data-depth": dataDepth, slugs }: MenuList) => {
  return (
    <ul
      className={`${styles.menuList} ${dataDepth === 1 ? styles.rootMenu : ""}`}
    >
      {menus.map((menu) => (
        <MenuItem
          menu={menu}
          data-depth={dataDepth}
          key={menu.id}
          slugs={slugs}
        />
      ))}
    </ul>
  );
};

type MenuItem = {
  menu: TabTypes;
  ["data-depth"]: number;
  slugs?: string[];
};
const MenuItem = ({ menu, "data-depth": dataDepth, slugs }: MenuItem) => {
  const params: { slug: string[] } = useParams();

  function paramsHasSlug(slug: string) {
    return params.slug?.some((s) => s === slug);
  }

  function getCurrSlugs() {
    return [...slugs!, menu.slug];
  }

  function isEverySlugPresentInParams() {
    let currSlugs = getCurrSlugs();
    return currSlugs.every((s) => params.slug?.includes(s));
  }

  const { hasChildrens, getMenus } = useMenus();
  const [open, setOpen] = useState(paramsHasSlug(menu.slug));

  const router = useRouter();
  const handleMenuItemClick = () => {
    if (hasChildrens(menu.id)) {
      setOpen(!open);
    } else {
      let currSlugs = getCurrSlugs();
      let routeToDocs = currSlugs.join("/");
      router.push(`/docs/${routeToDocs}`);
    }
  };
  return (
    <li
      className={`${styles.menuItem} ${
        isEverySlugPresentInParams() && !hasChildrens(menu.id)
          ? styles.active
          : ""
      }`}
    >
      <div
        onClick={handleMenuItemClick}
        style={
          {
            "--pl": dataDepth * 10,
          } as CSSProperties
        }
        className={`${styles.content} `}
      >
        <span>{menu.name}</span>
        {hasChildrens(menu.id) && (
          <IoIosArrowForward
            className={`${styles.arrowIcon} ${open ? styles.open : ""}`}
          />
        )}
      </div>
      {hasChildrens(menu.id) && (
        <div
          className={`${styles.nestedWrapper} ${!open ? styles.collapsed : ""}`}
        >
          <div className={`${styles.childrens}`}>
            <MenuList
              key={menu.id}
              menus={getMenus(menu.id)}
              data-depth={dataDepth + 1}
              slugs={[...slugs!, menu.slug]}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default Sidebar;
