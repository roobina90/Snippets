/*For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7]. The goal is to rotate array A K times; that is, each element of A will be shifted to the right by K indexes.*/

function solution(A, K) {
    var newK = K % A.length;    
    if (A.length <= 1 || newK === 0) return A;
    return A.slice(-newK).concat(A.slice(0, A.length-newK));
}