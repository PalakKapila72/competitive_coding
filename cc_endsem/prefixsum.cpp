class Solution {
  public:
    vector<int> rangeSumQueries(vector<int>& arr, vector<vector<int>>& queries) {
        int n=arr.size();
        vector<int> prefixsum(n+1,0);
        for(int i=0;i<n;i++){
            prefixsum[i+1]=prefixsum[i]+arr[i];
        }
        int q=(queries.size());
        vector<int> output(q);
        for(int i=0;i<q;i++){
            int l=queries[i][0];
            int r=queries[i][1];
            int sum=prefixsum[r+1]-prefixsum[l];
            output[i]=sum;
            
        }
     return output;   
    }
};
