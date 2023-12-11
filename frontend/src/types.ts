/**
 * common types
 */

import { StringLiteral } from "typescript";

export interface LsObject {
    name  : string;
    isdir : boolean;
    is_text: boolean;
    path  : string;
    handler: string;
  }

export interface BookmarkObject {
  alias: string;
  path: string;
}