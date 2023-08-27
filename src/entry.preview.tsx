/*
 * WHAT IS THIS FILE?
 *
 * It's the bundle entry point for `npm run preview`.
 * That is, serving your app built in production mode.
 *
 * Feel free to modify this file, but don't remove it!
 *
 * Learn more about Vite's preview command:
 * - https://vitejs.dev/config/preview-options.html#preview-options
 *
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import {
  RenderToStreamOptions,
  RenderToStreamResult,
} from '@builder.io/qwik/server';
import { MenuData, RouteData } from '@builder.io/qwik-city';

/**
 * The default export is the QwikCity adapter used by Vite preview.
 */
const qwikCity: {
  render: (opts: RenderToStreamOptions) => Promise<RenderToStreamResult>;
  qwikCityPlan: {
    routes: RouteData[];
    menus: MenuData[];
    trailingSlash: boolean;
    basePathname: string;
    cacheModules: boolean;
  };
} = { render, qwikCityPlan };
export default createQwikCity(qwikCity);
