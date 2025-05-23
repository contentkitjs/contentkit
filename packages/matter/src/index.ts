/**
 * Copyright (c) Jonas Franke and the ContentKit Contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { parse as yamlParse } from "yaml";
import { parse as tomlParse } from "@iarna/toml";
import { logger, colors } from "@ckjs/utils/logger";
import path from "node:path";

export function parseInternal(
  content: string,
  filePath: string,
): {
  data: Record<string, any>;
  body: string;
} {
  const delimiter = "---";
  const tomlDelimiter = "\\+\\+\\+";
  const delimiterRegex = new RegExp(
    `^(?:${delimiter}|${tomlDelimiter})\\s*\\n?([\\s\\S]*?)\\n?\\s*(?:${delimiter}|${tomlDelimiter})\\s*`,
  );

  const match = content.match(delimiterRegex);
  if (!match) {
    logger.error(
      `The content does not contain frontmatter in ${colors.gray}${path.relative(process.cwd(), filePath)}${colors.reset}`,
      "contentkit",
    );
    return process.exit(1);
  }

  const rawData = match[1].trim();
  const body = content.slice(match[0].length).trim();

  try {
    let data;
    const trimmedMatch = match[0].trim();
    if (trimmedMatch.startsWith(delimiter)) {
      if (rawData.startsWith("{") && rawData.endsWith("}")) {
        const sanitizedRawData = rawData.replace(/,\s*}$/, "}");
        data = JSON.parse(sanitizedRawData); // JSON frontmatter
      } else {
        data = yamlParse(rawData); // YAML frontmatter
      }
    } else if (trimmedMatch.startsWith("+++")) {
      data = tomlParse(rawData); // TOML frontmatter
    } else {
      logger.error(
        `The frontmatter format is not supported. Please use YAML, JSON or TOML in ${colors.gray}${path.relative(process.cwd(), filePath)}${colors.reset}`,
        "contentkit",
      );
      return process.exit(1);
    }
    return { data, body };
  } catch (error) {
    logger.error(
      `Error parsing frontmatter in ${colors.gray}${path.relative(process.cwd(), filePath)}${colors.reset}: ${(error as any).message}`,
      "contentkit",
    );
    return process.exit(1);
  }
}

export function parse(content: string): {
  data: Record<string, any>;
  body: string;
} {
  const delimiter = "---";
  const tomlDelimiter = "\\+\\+\\+";
  const delimiterRegex = new RegExp(
    `^(?:${delimiter}|${tomlDelimiter})\\s*\\n?([\\s\\S]*?)\\n?\\s*(?:${delimiter}|${tomlDelimiter})\\s*`,
  );

  const match = content.match(delimiterRegex);
  if (!match) {
    throw new Error("The content does not contain frontmatter.");
  }

  const rawData = match[1].trim();
  const body = content.slice(match[0].length).trim();

  try {
    let data;
    const trimmedMatch = match[0].trim();
    if (trimmedMatch.startsWith(delimiter)) {
      if (rawData.startsWith("{") && rawData.endsWith("}")) {
        const sanitizedRawData = rawData.replace(/,\s*}$/, "}");
        data = JSON.parse(sanitizedRawData); // JSON frontmatter
      } else {
        data = yamlParse(rawData); // YAML frontmatter
      }
    } else if (trimmedMatch.startsWith("+++")) {
      data = tomlParse(rawData); // TOML frontmatter
    } else {
      throw new Error(
        "The frontmatter format is not supported. Please use YAML, JSON or TOML.",
      );
    }
    return { data, body };
  } catch (error) {
    throw new Error((error as any).message);
  }
}
