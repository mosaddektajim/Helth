import streamlit as st
import re

# ১. ইমেইল ভ্যালিডেশন ফাংশন
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email)

# ২. ডিকশনারি (English & Bangla)
translations = {
    "English": {
        "title": "🥗 Health & Nutrition Assistant",
        "login_title": "🚀 Sign In",
        "email_label": "Enter your Gmail to start",
        "login_btn": "Enter App",
        "logout_btn": "Logout",
        "invalid_email": "Please enter a valid Gmail address!",
        "info_header": "Your Profile",
        "age": "Age",
        "gender": "Gender",
        "weight": "Weight (kg)",
        "height_ft": "Height (Feet)",
        "height_in": "Height (Inches)",
        "male": "Male",
        "female": "Female",
        "status_header": "📊 Health Status",
        "bmi_label": "BMI Score",
        "cal_label": "Daily Calorie Needs",
        "diet_btn": "Show Diet Chart",
        "low_w": "Underweight",
        "normal_w": "Healthy Weight",
        "high_w": "Overweight"
    },
    "বাংলা": {
        "title": "🥗 হেলথ ও নিউট্রিশন অ্যাসিস্ট্যান্ট",
        "login_title": "🚀 প্রবেশ করুন",
        "email_label": "শুরু করতে আপনার জিমেইল দিন",
        "login_btn": "অ্যাপে প্রবেশ করুন",
        "logout_btn": "লগআউট",
        "invalid_email": "সঠিক জিমেইল অ্যাড্রেস দিন!",
        "info_header": "আপনার প্রোফাইল",
        "age": "বয়স",
        "gender": "লিঙ্গ",
        "weight": "ওজন (কেজি)",
        "height_ft": "উচ্চতা (ফুট)",
        "height_in": "উচ্চতা (ইঞ্চি)",
        "male": "পুরুষ",
        "female": "মহিলা",
        "status_header": "📊 স্বাস্থ্যের অবস্থা",
        "bmi_label": "BMI স্কোর",
        "cal_label": "দৈনিক ক্যালোরি চাহিদা",
        "diet_btn": "ডায়েট চার্ট দেখুন",
        "low_w": "আপনার ওজন কম",
        "normal_w": "আপনার ওজন সঠিক",
        "high_w": "আপনার ওজন বেশি"
    }
}

# ৩. সেশন স্টেট
if "logged_in" not in st.session_state:
    st.session_state["logged_in"] = False
if "user_email" not in st.session_state:
    st.session_state["user_email"] = ""
if "lang" not in st.session_state:
    st.session_state["lang"] = "English"

def change_lang():
    st.session_state["lang"] = st.session_state["lang_select"]

def main():
    t = translations[st.session_state["lang"]]
    
    if not st.session_state["logged_in"]:
        # --- লগইন পেজ ---
        st.title(t["login_title"])
        email_input = st.text_input(t["email_label"], placeholder="example@gmail.com")
        
        if st.button(t["login_btn"]):
            if is_valid_email(email_input):
                st.session_state["logged_in"] = True
                st.session_state["user_email"] = email_input
                st.rerun()
            else:
                st.error(t["invalid_email"])
    else:
        # --- মেইন অ্যাপ ---
        st.sidebar.selectbox("Language / ভাষা", ["English", "বাংলা"], key="lang_select", on_change=change_lang)
        st.title(t["title"])
        st.write(f"Logged in as: **{st.session_state['user_email']}**")
        
        st.sidebar.divider()
        st.sidebar.header(t["info_header"])
        age = st.sidebar.number_input(t["age"], 1, 100, 25)
        gender = st.sidebar.radio(t["gender"], [t["male"], t["female"]])
        weight = st.sidebar.number_input(t["weight"], 10, 200, 70)
        
        # ফুট এবং ইঞ্চি ইনপুট
        col_ft, col_in = st.sidebar.columns(2)
        ft = col_ft.number_input(t["height_ft"], 1, 8, 5)
        inch = col_in.number_input(t["height_in"], 0, 11, 7)

        # উচ্চতা সেন্টিমিটারে রূপান্তর (1 foot = 30.48 cm, 1 inch = 2.54 cm)
        h_cm = (ft * 30.48) + (inch * 2.54)
        h_m = h_cm / 100
        
        # BMI ক্যালকুলেশন
        bmi = round(weight / (h_m ** 2), 2)

        # BMR ক্যালকুলেশন (Mifflin-St Jeor)
        if gender == t["male"]:
            bmr = (10 * weight) + (6.25 * h_cm) - (5 * age) + 5
        else:
            bmr = (10 * weight) + (6.25 * h_cm) - (5 * age) - 161
        daily_cal = round(bmr * 1.2, 0)

        # ফলাফল প্রদর্শন
        st.subheader(t["status_header"])
        c1, c2 = st.columns(2)
        c1.metric(t["bmi_label"], bmi)
        c2.metric(t["cal_label"], f"{daily_cal} kcal")

        if bmi < 18.5:
            st.warning(t["low_w"])
        elif 18.5 <= bmi <= 24.9:
            st.success(t["normal_w"])
        else:
            st.error(t["high_w"])

        # ডায়েট চার্ট সেকশন
        st.divider()
        if st.button(t["diet_btn"]):
            if st.session_state["lang"] == "English":
                if bmi < 25:
                    st.info("Plan: Stay Healthy")
                    st.write("- **Breakfast:** Eggs, Oats/Bread, Fruit.")
                    st.write("- **Lunch:** Rice, Fish/Meat, Vegetables, Lentils.")
                    st.write("- **Dinner:** Light Rice/Bread, Mixed Veggies.")
                else:
                    st.info("Plan: Weight Loss")
                    st.write("- **Breakfast:** Boiled Egg, Green Tea, No Sugar.")
                    st.write("- **Lunch:** Very small portion of rice, lots of salad.")
                    st.write("- **Dinner:** Soup or sautéed vegetables.")
            else:
                if bmi < 25:
                    st.info("লক্ষ্য: স্বাস্থ্য ধরে রাখা")
                    st.write("- **সকাল:** ডিম, ওটস বা রুটি, ফল।")
                    st.write("- **দুপুর:** পরিমিত ভাত, মাছ/মাংস, ডাল ও সবজি।")
                    st.write("- **রাত:** হালকা ভাত বা রুটি এবং সবজি।")
                else:
                    st.info("লক্ষ্য: ওজন কমানো")
                    st.write("- **সকাল:** সেদ্ধ ডিম, গ্রিন টি, চিনি ছাড়া খাবার।")
                    st.write("- **দুপুর:** খুব অল্প ভাত, প্রচুর সালাদ ও সবজি।")
                    st.write("- **রাত:** সবজি স্যুপ বা ভাজি।")

        if st.sidebar.button(t["logout_btn"]):
            st.session_state["logged_in"] = False
            st.rerun()

main()