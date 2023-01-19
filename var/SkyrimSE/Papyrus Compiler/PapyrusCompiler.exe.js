#!/usr/bin/env node

/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 */

/* eslint-disable no-undef */

// random fail
if (Math.random() > 0.8) {
  console.error('Batch compile of 1 files finished. 0 succeeded, 1 failed.')
  process.exit(1)
}

console.log('Batch compile of 1 files finished. 1 succeeded, 0 failed.')
