---
layout: post
date: 2022-01-03
title: "Javascript algorithm: Quickselect"
description: A method of picking up kth smallest/largest element
published: true
comments: false
tags: [algorithm, javascript]
skip_amp: true
---

According wikipedia [definition](https://en.wikipedia.org/wiki/quickselect)

> Quickselect is a selection algorithm to find the kth smallest element in an unordered list

<!-- more -->

The idea of quickselect was related to the quicksort sorting algorithm. It was developed by Tony Hoare, so it is also known as Hoare's selection algorithm.

Quickselect has 3 main functions

1. quickselect
2. partition
3. swap

## Quickselect

It has three factors: `left`, `right` pointers and a `pivot` index.

It's a recursion function until the pivot index is equal to the kth smallest index.

The pivot index is generated randomly between the left and right pointers, expression like `pivotIndex = Math.floor(Math.random() * (right - left + 1) + left)`

The left pointer starts with 0. If `kth smallest index > pivotIndex`, update `pivotIndex + 1` as the next left argument and the right argument not change.

Vice versa, the right pointer starts with the `array length - 1`. If `kth smallest index < pivotIndex`, update `pivotIndex - 1` as the next right argument and the left argument not change.

Otherwise, we found the kth smallest index and return its value.

## Partition

Inside of the quickselect, the pivot index is updated by partition. Partition is to put the values of the array in order by following steps:

1. Swap the pivot index value with the right pointer value
2. Assign the left pointer to a store index
3. For loop the left pointer until `left <= right`, if `nums[i] < pivotValue` swap the store index value and the loop's i value, update the store index + 1
4. Swap the store index value with the right pointer value (the first greater element larger than the the pivot value)

## Swap

Swap is used very often in the partition. It's better has an utility function.

In ES6, express like this

```js
function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}
```

## Put it all together

```js
// kth largest = (N - k)th smallest = 1st largest in a sorted array

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  function swap(i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  function partition(l, r, pivotIndex) {
    const pivotValue = nums[pivotIndex];
    // 1. move pivotIndex to end
    swap(pivotIndex, r);

    let storeIndex = l;
    // 2. move all elements of nums smaller than nums[pivotIndex] to the left
    for (let i = l; i <= r; i++) {
      if (nums[i] < pivotValue) {
        swap(storeIndex, i);
        storeIndex++;
      }
    }

    // 3. move 1st element larger than nums[pivotIndex] to its right
    swap(storeIndex, r);

    return storeIndex;
  }

  function quickselect(l, r, kSmallest) {
    // best case for the first input
    if (l === r) {
      return nums[l];
    }

    let pivotIndex = Math.floor(Math.random() * (r - l + 1) + l);

    // update position for next pivotIndex
    pivotIndex = partition(l, r, pivotIndex);
    
    // the pivotIndex is on (N - k)th smallest position
    if (kSmallest == pivotIndex) return nums[kSmallest];
    // update right, go left side
    else if (kSmallest < pivotIndex) return quickselect(l, pivotIndex - 1, kSmallest);
    // update left, go right side
    return quickselect(pivotIndex + 1, r, kSmallest);
  }

  return quickselect(0, nums.length - 1, nums.length - k);
};
```

It has O(N) average time complexity, O(N^2) in the worst case.

## Additional

[Javascript: Quicksort](https://wsvincent.com/javascript-algorithms-quicksort/)
