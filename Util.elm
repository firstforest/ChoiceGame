module Util where

import Pseudorandom (randomRange)

random high seed =
  let
    (r, s) = randomRange (1, high) 1 seed
  in
    (head r, s)

shuffle xs seed =
  case xs of
    [] -> []
    _ ->
      let
        (rn, seed') = random (length xs) seed
        x = nth rn xs
        rest = dropN rn xs
      in
        x :: (shuffle rest seed')

nth : Int -> [Int] -> Int
nth n xs = last (take n xs)

dropN : Int -> [Int] -> [Int]
dropN n xs = (take (n - 1) xs) ++ (drop n xs)