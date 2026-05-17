#!/bin/bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"0335006406","password":"123456"}' | python3 -c "import sys,json; print(json.load(sys.stdin).get('access_token',''))")

# Use exact customer position (Hanoi)
curl -s "http://localhost:3000/api/taskers/active?lat=21.0108&lng=105.7972" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "
import sys,json
d=json.load(sys.stdin)
if isinstance(d, list):
    print(f'Total: {len(d)} taskers')
    # Show ALL taskers under 50km
    nearby = [x for x in d if x.get('distance') is not None and x['distance']/1000 < 50]
    print(f'Within 50km: {len(nearby)}')
    for x in nearby:
        uid = x.get('user_id','?')
        name = x.get('full_name','?')
        dist = x.get('distance',0)
        ts = x.get('taskers')
        kyc = ts.get('kyc_status','?') if ts else 'NO_TASKER_DATA'
        svc_count = len(ts.get('tasker_services',[])) if ts else 0
        print(f'  ID={uid} | {name} | {dist:.1f}m | kyc={kyc} | services={svc_count}')
else:
    print('Error:', d)
"
