import csv
from collections import defaultdict
import os

file_path = r'd:\Chi_oi-main\CHIOI - Khách hàng.csv'
out_path = r'C:\Users\LOQ\.gemini\antigravity\brain\c23771cf-4d40-4fb9-b062-cd7f32ba70bb\artifacts\test_status_report.md'

with open(file_path, mode='r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    rows = list(reader)

header_idx = -1
for i, row in enumerate(rows):
    if row and row[0].strip() == 'TESTCASE ID':
        header_idx = i
        break

data = rows[header_idx+1:] if header_idx != -1 else rows[6:]

groups = defaultdict(list)
current_group_name = 'Khác'

for row in data:
    if not row: continue
    tc_id = row[0].strip()
    
    if tc_id == '' and len(row) > 1 and row[1].strip() != '':
        current_group_name = row[1].strip()
        continue
        
    if tc_id == '':
        continue
        
    name = row[1].strip()
    status = row[6].strip().upper() if len(row) > 6 else ''
    if status == 'NOT RUN':
        status = 'NOT RUN'
    elif status == 'PASS':
        status = 'PASS'
    elif status == 'FAIL':
        status = 'FAIL'
    elif status == '':
        status = 'EMPTY'
    else:
        status = status
        
    parts = tc_id.split('-')
    if len(parts) >= 2:
        uc_prefix = '-'.join(parts[:-1])
    else:
        uc_prefix = current_group_name
        
    groups[uc_prefix].append({
        'id': tc_id,
        'name': name,
        'status': status
    })

uc_fail = []
uc_not_run = []
uc_pass_only = []
uc_has_empty = []

for uc, tcs in groups.items():
    statuses = set(tc['status'] for tc in tcs)
    
    if 'FAIL' in statuses:
        uc_fail.append(uc)
    if 'NOT RUN' in statuses:
        uc_not_run.append(uc)
    if 'EMPTY' in statuses:
        uc_has_empty.append(uc)
    
    if len(statuses) == 1 and 'PASS' in statuses:
        uc_pass_only.append(uc)

md = []
md.append('# Báo cáo Trạng thái Test Case - Khách hàng')
md.append('\n## 1. Các Use Case Pass hoàn toàn (100% Pass)')
if uc_pass_only:
    for uc in uc_pass_only:
        md.append(f'- **{uc}** ({len(groups[uc])} test cases)')
else:
    md.append('- (Không có Use Case nào Pass 100%)')

md.append('\n## 2. Các Use Case có test case FAIL')
for uc in uc_fail:
    md.append(f'\n### {uc}')
    for tc in groups[uc]:
        if tc['status'] == 'FAIL':
            md.append(f"- 🔴 **{tc['id']}**: {tc['name']}")

md.append('\n## 3. Các Use Case có test case NOT RUN')
for uc in uc_not_run:
    md.append(f'\n### {uc}')
    for tc in groups[uc]:
        if tc['status'] == 'NOT RUN':
            md.append(f"- ⚪ **{tc['id']}**: {tc['name']}")

md.append('\n## 4. Các Use Case có test case CHƯA ĐƯỢC TEST (Trạng thái trống)')
for uc in uc_has_empty:
    md.append(f'\n### {uc}')
    for tc in groups[uc]:
        if tc['status'] == 'EMPTY':
            md.append(f"- 🟡 **{tc['id']}**: {tc['name']}")

os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print('Done')
