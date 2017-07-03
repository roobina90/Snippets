
// A non-empty zero-indexed array A consisting of N integers is given. The array contains an odd number of elements, and each element of the array can be paired with another element that has the same value, except for one element that is left unpaired.


function solution(A) {
   if(A.length === 0) return undefined;
   if(A.length === 1) return A[0];
   var result =0;
   for(var i =0; i < A.length; i++) {
    result ^= A[i];   
   }
   return result;
}