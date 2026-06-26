---
title: "MathJax Test"
date: 2013-12-24T01:10:00+00:00
---

This post exercises the **site-wide** MathJax setting (`params.mathjax.enabled`).
It deliberately sets no per-page front matter — if math renders here, the global
flag is wired up correctly.

<!--more-->

## Inline math

Inline equations use single-dollar delimiters: the mass–energy relation is
$E = mc^2$, and Euler's identity $e^{i\pi} + 1 = 0$ sits in the middle of a
sentence without breaking the line.

## Display math

A centered, display-style equation uses double-dollar delimiters:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

## A few more constructs

Fractions, sums, and Greek letters:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

A matrix:

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}
\begin{pmatrix} x \\ y \end{pmatrix}
=
\begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}
$$

If these render as typeset math rather than raw TeX, MathJax v4 is loading and
the global flag works.
