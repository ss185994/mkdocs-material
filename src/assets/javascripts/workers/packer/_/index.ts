/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A RTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { Subject } from "rxjs"

import { WorkerHandler, watchWorker } from "observables"

import { PackerMessage } from "../message"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup packer web worker
 *
 * This function will create a web worker that helps in packing and unpacking
 * strings using an LZ-based algorithm, namely `lz-string`. Its main purpose is
 * to compress the search index before storing it in local storage, so it can
 * be retrieved and imported to minimize the time necessary to setup search.
 *
 * @see https://bit.ly/2Q1ArhU - LZ-String documentation
 *
 * @param url - Worker url
 *
 * @return Worker handler
 */
export function setupPackerWorker(
  url: string
): WorkerHandler<PackerMessage> {
  const worker = new Worker(url)

  /* Create communication channels */
  const tx$ = new Subject<PackerMessage>()
  const rx$ = watchWorker(worker, { tx$ })

  /* Return worker handler */
  return { tx$, rx$ }
}