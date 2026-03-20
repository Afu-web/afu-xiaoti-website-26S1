import os
import shutil

def sync_to_github():
    # 取得目前這個 python 檔案所在的資料夾位置 (0320LT)
    source_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 預設目標資料夾：GitHub Desktop 通常會把專案放在這裡
    # 如果你的 github 專案放在其他地方（例如 D槽 或是 桌面），請直接修改下面這行 r"" 裡面的路徑！
    dest_dir = os.path.join(os.path.expanduser("~"), "Desktop", "antigravity", "0320LT", "GitHub", "AX-website-26S1")
    
    # 【範例】如果你的路徑在桌面，可以把上面那行首加上 # 註解，並把下面這行開頭的 # 刪掉：
    # dest_dir = r"C:\Users\23wei\Desktop\github\AX-website-26S1"

    # 你所指定「只要這三個」的項目清單（因為 images 檔案很大，分開管理的確是好主意！）
    items_to_copy = ["index.html", "js", "css"]

    print(f"[{source_dir}]  準備同步至  [{dest_dir}]")
    print("-" * 40)

    if not os.path.exists(dest_dir):
        print(f"❌ 找不到目標資料夾: {dest_dir}")
        print("請右鍵用記事本打開這個 Python 檔案，並修改 dest_dir 變數為你電腦中正確的 GitHub 專案路徑！")
        input("按 Enter 鍵退出...")
        return

    for item in items_to_copy:
        src_path = os.path.join(source_dir, item)
        dst_path = os.path.join(dest_dir, item)

        if not os.path.exists(src_path):
            print(f"⚠️ 找不到來源檔案或資料夾: {item}，略過該項目。")
            continue

        try:
            if os.path.isfile(src_path):
                # 複製單一檔案
                shutil.copy2(src_path, dst_path)
                print(f"✅ 成功複製檔案: {item}")
            elif os.path.isdir(src_path):
                # 複製整個資料夾 (遇到重複的檔案會覆蓋)
                shutil.copytree(src_path, dst_path, dirs_exist_ok=True)
                print(f"✅ 成功複製資料夾: {item}")
        except Exception as e:
            print(f"❌ 複製 {item} 時發生錯誤: {e}")

    print("-" * 40)
    print("✨ 程式碼同步完成！現在你可以去 GitHub Desktop 提交 (Commit) 了！")
    input("按 Enter 鍵關閉視窗...")

if __name__ == "__main__":
    sync_to_github()
