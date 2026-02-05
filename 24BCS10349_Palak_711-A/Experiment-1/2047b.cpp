#include <bits/stdc++.h>
using namespace std;

long long fact[11];

long long countPerm(string s) {
    vector<int> freq(26, 0);
    for (char c : s) freq[c - 'a']++;

    long long res = fact[s.size()];
    for (int f : freq) {
        res /= fact[f];
    }
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    fact[0] = 1;
    for (int i = 1; i <= 10; i++) fact[i] = fact[i - 1] * i;

    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        string s;
        cin >> s;

        string best = s;
        long long bestVal = LLONG_MAX;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                string temp = s;
                temp[i] = temp[j];

                long long val = countPerm(temp);

                if (val < bestVal) {
                    bestVal = val;
                    best = temp;
                }
            }
        }

        cout << best << "\n";
    }

    return 0;
}
