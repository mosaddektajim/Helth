// ১. ভাষা ডিকশনারি (English & Bangla Complete Support)
const translations = {
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
        "height_ft": "Feet",
        "height_in": "Inches",
        "male": "Male",
        "female": "Female",
        "status_header": "📊 Health Status",
        "bmi_label": "BMI Score",
        "cal_label": "Daily Calorie Needs",
        "diet_btn": "Show Diet Chart",
        "hide_diet_btn": "Hide Diet Chart",
        "workout_btn": "Show Fitness Routine",
        "hide_workout_btn": "Hide Fitness Routine",
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
        "age": "বয়স",
        "gender": "লিঙ্গ",
        "weight": "ওজন (কেজি)",
        "height_ft": "ফুট",
        "height_in": "ইঞ্চি",
        "male": "পুরুষ",
        "female": "মহিলা",
        "status_header": "📊 স্বাস্থ্যের অবস্থা",
        "bmi_label": "BMI স্কোর",
        "cal_label": "দৈনিক ক্যালোরি চাহিদা",
        "diet_btn": "ডায়েট চার্ট দেখুন",
        "hide_diet_btn": "ডায়েট চার্ট লুকান",
        "workout_btn": "ব্যায়াম রুটিন দেখুন",
        "hide_workout_btn": "ব্যায়াম রুটিন লুকান",
        "low_w": "আপনার ওজন কম",
        "normal_w": "আপনার ওজন সঠিক",
        "high_w": "আপনার ওজন বেশি"
    }
};

let currentLang = "English";
let userEmail = "";

// ২. ইমেইল ভ্যালিডেশন
function isValidEmail(email) {
    const pattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return pattern.test(email);
}

// ৩. লগইন হ্যান্ডলার
function handleLogin() {
    const emailInput = document.getElementById("email").value;
    const errorMsg = document.getElementById("email-error");

    if (isValidEmail(emailInput)) {
        userEmail = emailInput;
        errorMsg.innerText = "";
        document.getElementById("login-card").classList.add("hidden");
        document.getElementById("app-card").classList.remove("hidden");
        if (currentLang === "English") {
            document.getElementById("user-display").innerHTML = `Logged in as: <b>${userEmail}</b>`;
        } else {
            document.getElementById("user-display").innerHTML = `লগইন করা আছে: <b>${userEmail}</b>`;
        }
        calculateHealth();
    } else {
        errorMsg.innerText = translations[currentLang]["invalid_email"];
    }
}

// ৪. লগআউট হ্যান্ডলার
function handleLogout() {
    document.getElementById("app-card").classList.add("hidden");
    document.getElementById("login-card").classList.remove("hidden");
    document.getElementById("email").value = "";
    document.getElementById("diet-chart").classList.add("hidden");
    document.getElementById("workout-chart").classList.add("hidden");
}

// ৫. ভাষা পরিবর্তন
function changeLanguage() {
    currentLang = document.getElementById("lang-select").value;
    const t = translations[currentLang];

    document.getElementById("app-title").innerText = t["title"];
    document.getElementById("login-title").innerText = t["login_title"];
    document.getElementById("email-label").innerText = t["email_label"];
    document.getElementById("login-btn").innerText = t["login_btn"];
    document.getElementById("logout-btn").innerText = t["logout_btn"];
    document.getElementById("info-header").innerText = t["info_header"];
    document.getElementById("lbl-age").innerText = t["age"];
    document.getElementById("lbl-gender").innerText = t["gender"];
    document.getElementById("lbl-weight").innerText = t["weight"];
    document.getElementById("lbl-height-ft").innerText = t["height_ft"];
    document.getElementById("lbl-height-in").innerText = t["height_in"];
    document.getElementById("lbl-male").innerText = t["male"];
    document.getElementById("lbl-female").innerText = t["female"];
    document.getElementById("status-header").innerText = t["status_header"];
    document.getElementById("lbl-bmi").innerText = t["bmi_label"];
    document.getElementById("lbl-cal").innerText = t["cal_label"];
    
    if (currentLang === "English") {
        document.getElementById("user-display").innerHTML = `Logged in as: <b>${userEmail}</b>`;
    } else {
        document.getElementById("user-display").innerHTML = `লগইন করা আছে: <b>${userEmail}</b>`;
    }

    // বাটন টেক্সট আপডেট
    const dietBox = document.getElementById("diet-chart");
    const dietBtn = document.getElementById("diet-btn");
    dietBtn.innerText = dietBox.classList.contains("hidden") ? t["diet_btn"] : t["hide_diet_btn"];
    if (!dietBox.classList.contains("hidden")) { toggleDietChart(); toggleDietChart(); }

    const workoutBox = document.getElementById("workout-chart");
    const workoutBtn = document.getElementById("workout-btn");
    workoutBtn.innerText = workoutBox.classList.contains("hidden") ? t["workout_btn"] : t["hide_workout_btn"];
    if (!workoutBox.classList.contains("hidden")) { toggleWorkoutChart(); toggleWorkoutChart(); }

    calculateHealth();
}

// ৬. BMI ও পরামর্শ হিসাব
function calculateHealth() {
    const age = parseFloat(document.getElementById("age").value) || 0;
    const weight = parseFloat(document.getElementById("weight").value) || 0;
    const ft = parseFloat(document.getElementById("height-ft").value) || 0;
    const inch = parseFloat(document.getElementById("height-in").value) || 0;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    const t = translations[currentLang];

    const h_cm = (ft * 30.48) + (inch * 2.54);
    const h_m = h_cm / 100;

    if (h_m === 0) return;

    const bmi = (weight / (h_m * h_m)).toFixed(2);
    document.getElementById("bmi-val").innerText = bmi;

    let bmr = 0;
    if (gender === "male") {
        bmr = (10 * weight) + (6.25 * h_cm) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * h_cm) - (5 * age) - 161;
    }
    const daily_cal = Math.round(bmr * 1.2);
    document.getElementById("cal-val").innerText = `${daily_cal} kcal`;

    const idealWeight = (22 * h_m * h_m).toFixed(1);
    const weightDiff = Math.abs(weight - idealWeight).toFixed(1);

    const alertBox = document.getElementById("status-alert");
    alertBox.classList.remove("hidden", "low", "normal", "high");

    if (bmi < 18.5) {
        if (currentLang === "English") {
            alertBox.innerText = `${t["low_w"]}! You need to gain about ${weightDiff} kg to reach the ideal weight.`;
        } else {
            alertBox.innerText = `${t["low_w"]}! আদর্শ ওজনে পৌঁছাতে আপনার প্রায় ${weightDiff} কেজি ওজন বাড়ানো দরকার।`;
        }
        alertBox.classList.add("low");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        if (weight < idealWeight) {
            if (currentLang === "English") {
                alertBox.innerText = `${t["normal_w"]}, but your weight is slightly under the ideal mark. You can gain about ${weightDiff} kg for the best physique.`;
            } else {
                alertBox.innerText = `${t["normal_w"]}! তবে আদর্শ ওজনের চেয়ে আপনার ওজন সামান্য কম আছে। সেরা ফিটনেসের জন্য আরও প্রায় ${weightDiff} কেজি ওজন বাড়াতে পারেন।`;
            }
        } else if (weight > idealWeight) {
            if (currentLang === "English") {
                alertBox.innerText = `${t["normal_w"]}, but your weight is slightly over the ideal mark. You can lose about ${weightDiff} kg for the best physique.`;
            } else {
                alertBox.innerText = `${t["normal_w"]}! তবে আদর্শ ওজনের চেয়ে আপনার ওজন সামান্য বেশি আছে। সেরা ফিটনেসের জন্য আরও প্রায় ${weightDiff} কেজি কমাতে পারেন।`;
            }
        } else {
            if (currentLang === "English") {
                alertBox.innerText = `${t["normal_w"]}! Your weight is completely perfect.`;
            } else {
                alertBox.innerText = `${t["normal_w"]}! আপনার ওজন একদম নিখুঁত ও পারফেক্ট আছে।`;
            }
        }
        alertBox.classList.add("normal");
    } else {
        if (currentLang === "English") {
            alertBox.innerText = `${t["high_w"]}! You need to lose about ${weightDiff} kg.`;
        } else {
            alertBox.innerText = `${t["high_w"]}! আপনার প্রায় ${weightDiff} কেজি ওজন কমানো দরকার।`;
        }
        alertBox.classList.add("high");
    }
}

// ৭. আলাদা ডায়েট চার্ট ফাংশন
function toggleDietChart() {
    const dietBox = document.getElementById("diet-chart");
    const dietBtn = document.getElementById("diet-btn");
    const t = translations[currentLang];
    const bmi = parseFloat(document.getElementById("bmi-val").innerText);
    const weight = parseFloat(document.getElementById("weight").value) || 70;
    
    const h_cm = (parseFloat(document.getElementById("height-ft").value || 5) * 30.48) + (parseFloat(document.getElementById("height-in").value || 0) * 2.54);
    const h_m = h_cm / 100;
    const idealWeight = (22 * h_m * h_m).toFixed(1);
    const weightDiff = Math.abs(weight - idealWeight).toFixed(1);

    if (dietBox.classList.contains("hidden")) {
        let content = "";
        if (currentLang === "English") {
            if (bmi < 18.5) {
                content = `<h4>🎯 Diet Plan: Gain Weight (Need +${weightDiff} kg)</h4>
                           <p>• <b>Breakfast:</b> 2 Whole Eggs, 2 Slices of Bread with Peanut Butter (approx. 40g), 1 Glass of Whole Milk (250ml), 1 Banana.</p>
                           <p>• <b>Lunch:</b> 200g Cooked Rice, 150g Chicken or Fish, 1 Bowl Dal (100g), Mixed Vegetables.</p>
                           <p>• <b>Evening Snack:</b> 30g Mixed Dry Fruits and 1 Glass of Banana Milkshake (250ml).</p>
                           <p>• <b>Dinner:</b> 3 Ratis or 150g Cooked Rice, Meat/Fish Curry, 1 Bowl Vegetables.</p>`;
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                if (weight < idealWeight) {
                    content = `<h4>🎯 Diet Plan: Slightly Gain to Reach Ideal Mark (Need +${weightDiff} kg)</h4>
                               <p>• <b>Breakfast:</b> 2 Eggs, Oats (50g) with Milk, 1 Banana.</p>
                               <p>• <b>Lunch:</b> 180g Cooked Rice, 120g Chicken or Fish, 1 Bowl Dal, Vegetables.</p>
                               <p>• <b>Evening Snack:</b> Handful of nuts and a glass of milk.</p>
                               <p>• <b>Dinner:</b> 2 Ratis or 130g Cooked Rice, Meat/Fish curry, Vegetables.</p>`;
                } else if (weight > idealWeight) {
                    content = `<h4>🎯 Diet Plan: Slightly Lose to Reach Ideal Mark (Need -${weightDiff} kg)</h4>
                               <p>• <b>Breakfast:</b> 1 Boiled Egg, Green Tea, 1 Brown Bread slice.</p>
                               <p>• <b>Lunch:</b> 100g Cooked Rice, Clear Vegetable Soup, Large Salad, 100g Grilled Chicken/Fish.</p>
                               <p>• <b>Evening Snack:</b> Green Tea and cucumber slices.</p>
                               <p>• <b>Dinner:</b> 1 Rati or Vegetable soup, 150g Sautéed vegetables.</p>`;
                } else {
                    content = `<h4>🎯 Diet Plan: Maintain Perfect Weight</h4>
                               <p>• <b>Breakfast:</b> 1 Boiled Egg, Oats (40g) or 2 Ratis, 1 Seasonal Fruit.</p>
                               <p>• <b>Lunch:</b> 150g Cooked Rice, Fish or Chicken (100g), Dal (50g), Plenty of Salad.</p>
                               <p>• <b>Evening Snack:</b> Green Tea and 25g roasted chana or nuts.</p>
                               <p>• <b>Dinner:</b> 2 Ratis or 120g Cooked Rice, Vegetable curry, Clear Soup.</p>`;
                }
            } else {
                content = `<h4>🎯 Diet Plan: Lose Weight (Need -${weightDiff} kg)</h4>
                           <p>• <b>Breakfast:</b> 1 Boiled Egg White, Green Tea (No Sugar), 1 Brown Bread slice (approx. 30g).</p>
                           <p>• <b>Lunch:</b> 80g to 100g Cooked Rice, 1 Bowl clear vegetable soup, Large portion of Salad (150g), 120g Grilled Fish/Chicken.</p>
                           <p>• <b>Evening Snack:</b> Warm water with Lemon / Green Tea, cucumber slices (100g).</p>
                           <p>• <b>Dinner:</b> 1 Rati or Vegetable soup, Sautéed vegetables (200g).</p>`;
            }
        } else {
            if (bmi < 18.5) {
                content = `<h4>🎯 ডায়েট প্ল্যান: ওজন বাড়ানো (দরকার +${weightDiff} কেজি)</h4>
                           <p>• <b>সকাল:</b> ২টি সেদ্ধ ডিম, পিনাট বাটারসহ ২ টুকরো ব্রেড (প্রায় ৪০ গ্রাম), ১ গ্লাস ফুল ক্রিম দুধ (২৫০ মিলি) এবং ১টি কলা।</p>
                           <p>• <b>দুপুর:</b> ২০০ গ্রাম রান্না করা ভাত, ১৫০ গ্রাম মুরগির মাংস বা মাছ, ১ বাটি ডাল (১০০ গ্রাম) এবং সবজি।</p>
                           <p>• <b>বিকেলের নাস্তা:</b> ৩০ গ্রাম ড্রাই ফ্রুটস (বাদাম/কিশমিশ) এবং ১ গ্লাস কলার মিল্কশেক (২৫০ মিলি)।</p>
                           <p>• <b>রাত:</b> ৩টি রুটি অথবা ১৫০ গ্রাম ভাত, মাছ বা মাংসের তরকারি এবং ১ বাটি সবজি।</p>`;
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                if (weight < idealWeight) {
                    content = `<h4>🎯 ডায়েট প্ল্যান: আদর্শ ওজনে পৌঁছাতে সামান্য ওজন বাড়ানো (দরকার +${weightDiff} কেজি)</h4>
                               <p>• <b>সকাল:</b> ২টি ডিম, দুধসহ ওটস (৫০ গ্রাম) এবং ১টি কলা।</p>
                               <p>• <b>দুপুর:</b> ১৮০ গ্রাম রান্না করা ভাত, ১২০ গ্রাম মুরগি বা মাছ, ১ বাটি ডাল ও সবজি।</p>
                               <p>• <b>বিকেলের নাস্তা:</b> এক মুঠো বাদাম এবং ১ গ্লাস দুধ।</p>
                               <p>• <b>রাত:</b> ২টি রুটি বা ১৩০ গ্রাম ভাত, মাছ বা মাংসের তরকারি এবং সবজি।</p>`;
                } else if (weight > idealWeight) {
                    content = `<h4>🎯 ডায়েট প্ল্যান: আদর্শ ওজনে পৌঁছাতে সামান্য ওজন কমানো (দরকার -${weightDiff} কেজি)</h4>
                               <p>• <b>সকাল:</b> ১টি সেদ্ধ ডিম, গ্রিন টি এবং ১ টুকরো ব্রাউন ব্রেড।</p>
                               <p>• <b>দুপুর:</b> ১০০ গ্রাম রান্না করা ভাত, সবজি স্যুপ, প্রচুর সালাদ এবং ১০০ গ্রাম গ্রিল করা মাছ বা মুরগি।</p>
                               <p>• <b>বিকেলের নাস্তা:</b> গ্রিন টি এবং শসা কুচি।</p>
                               <p>• <b>রাত:</b> ১টি রুটি বা সবজি স্যুপ এবং ১৫০ গ্রাম সেদ্ধ বা ভাজা সবজি।</p>`;
                } else {
                    content = `<h4>🎯 ডায়েট প্ল্যান: নিখুঁত ওজন ধরে রাখা (মেইনটেইন)</h4>
                               <p>• <b>সকাল:</b> ১টি সেদ্ধ ডিম, ওটস (৪০ গ্রাম) বা ২টি রুটি, ১টি ফল।</p>
                               <p>• <b>দুপুর:</b> ১৫০ গ্রাম রান্না করা ভাত, মাছ বা মুরগির মাংস (১০০ গ্রাম), ৫০ গ্রাম ডাল ও প্রচুর সালাদ।</p>
                               <p>• <b>বিকেলের নাস্তা:</b> গ্রিন টি এবং ২৫ গ্রাম ভাজা ছোলা বা বাদাম।</p>
                               <p>• <b>রাত:</b> ২টি রুটি বা ১২০ গ্রাম হালকা ভাত, সবজি এবং এক বাটি স্যুপ।</p>`;
                }
            } else {
                content = `<h4>🎯 ডায়েট প্ল্যান: ওজন কমানো (দরকার -${weightDiff} কেজি)</h4>
                           <p>• <b>সকাল:</b> ১টি ডিমের সাদা অংশ, চিনি ছাড়া গ্রিন টি এবং ১ টুকরো ব্রাউন ব্রেড (প্রায় ৩০ গ্রাম)।</p>
                           <p>• <b>দুপুর:</b> ৮০ থেকে ১০০ গ্রাম রান্না করা ভাত, ১ বাটি পাতলা ডাল, ১৫০ গ্রাম শসা-টমেটোর সালাদ এবং ১২০ গ্রাম গ্রিল করা মাছ বা মুরগি।</p>
                           <p>• <b>বিকেলের নাস্তা:</b> লেবুর শরবত (চিনি ছাড়া) অথবা গ্রিন টি এবং ১০০ গ্রাম শসা বা গাজর কুচি।</p>
                           <p>• <b>রাত:</b> ১টি রুটি অথবা সবজি স্যুপ এবং ২০০ গ্রাম সেদ্ধ বা ভাজা সবজি (রাত ৮টার মধ্যে খাবার শেষ করুন)।</p>`;
            }
        }
        dietBox.innerHTML = content;
        dietBox.classList.remove("hidden");
        dietBtn.innerText = t["hide_diet_btn"];
    } else {
        dietBox.classList.add("hidden");
        dietBtn.innerText = t["diet_btn"];
    }
}

// ৮. আলাদা ফিটনেস/ব্যায়াম রুটিন ফাংশন
function toggleWorkoutChart() {
    const workoutBox = document.getElementById("workout-chart");
    const workoutBtn = document.getElementById("workout-btn");
    const t = translations[currentLang];
    const bmi = parseFloat(document.getElementById("bmi-val").innerText);
    const weight = parseFloat(document.getElementById("weight").value) || 70;
    
    const h_cm = (parseFloat(document.getElementById("height-ft").value || 5) * 30.48) + (parseFloat(document.getElementById("height-in").value || 0) * 2.54);
    const h_m = h_cm / 100;
    const idealWeight = (22 * h_m * h_m).toFixed(1);

    if (workoutBox.classList.contains("hidden")) {
        let content = "";
        if (currentLang === "English") {
            if (bmi < 18.5) {
                content = `<h4>🏋️ Fitness Routine: Weight Gain</h4>
                           <p>• <b>Strength Training:</b> Push-ups, Squats, and Light Dumbbell exercises (3 days a week, 20-30 mins).</p>
                           <p>• <b>Cardio:</b> Keep cardio minimal (only 10 mins light walking) to prevent calorie burn.</p>
                           <p>• <b>Rest:</b> Proper 8 hours of sleep for muscle recovery.</p>`;
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                if (weight < idealWeight) {
                    content = `<h4>🏋️ Fitness Routine: Slightly Gain</h4>
                               <p>• <b>Resistance Training:</b> Push-ups, Bodyweight squats, or core strengthening (3 days a week, 30 mins).</p>
                               <p>• <b>Cardio:</b> Light jogging or brisk walking (15 mins daily).</p>`;
                } else if (weight > idealWeight) {
                    content = `<h4>🏋️ Fitness Routine: Slightly Lose</h4>
                               <p>• <b>Cardio:</b> Brisk walking or cycling (30-40 mins daily).</p>
                               <p>• <b>Core Workout:</b> Plank (3 sets of 30 seconds) and stomach crunches.</p>`;
                } else {
                    content = `<h4>🏋️ Fitness Routine: Perfect Maintenance</h4>
                               <p>• <b>Active Lifestyle:</b> Regular morning walk or light jogging (20-30 mins).</p>
                               <p>• <b>General Fitness:</b> Stretching, yoga, or basic bodyweight exercises to stay active.</p>`;
                }
            } else {
                content = `<h4>🏋️ Fitness Routine: Weight Loss</h4>
                           <p>• <b>Cardio Training:</b> Fast running, skipping, or cycling (40-45 mins every morning).</p>
                           <p>• <b>Fat Burn:</b> Jumping jacks, high knees, and planks (15-20 mins in the evening).</p>`;
            }
        } else {
            if (bmi < 18.5) {
                content = `<h4>🏋️ ব্যায়াম ও ফিটনেস রুটিন: ওজন বাড়ানো</h4>
                           <p>• <b>স্ট্রেন্থ ট্রেনিং:</b> পুশ-আপ, স্কোয়াট এবং হালকা ডাম্বেল এক্সারসাইজ (সপ্তাহে ৩ দিন, ২০-৩০ মিনিট)।</p>
                           <p>• <b>কার্ডিও:</b> অতিরিক্ত ক্যালোরি বার্ন রোধ করতে কার্ডিও বা দৌড়ানো এড়িয়ে চলুন (শুধু ১০ মিনিট হালকা হাঁটুন)।</p>
                           <p>• <b>বিশ্রাম:</b> পেশী গঠনে প্রতিদিন অন্তত ৮ ঘণ্টা গভীর ঘুমান।</p>`;
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                if (weight < idealWeight) {
                    content = `<h4>🏋️ ব্যায়াম ও ফিটনেস রুটিন: সামান্য ওজন বাড়ানো</h4>
                               <p>• <b>বডি ওয়েট এক্সারসাইজ:</b> পুশ-আপ ও স্কোয়াট (সপ্তাহে ৩ দিন, ৩০ মিনিট)।</p>
                               <p>• <b>হাঁটা:</b> প্রতিদিন ১৫ মিনিট হালকা জগিং বা দ্রুত হাঁটা।</p>`;
                } else if (weight > idealWeight) {
                    content = `<h4>🏋️ ব্যায়াম ও ফিটনেস রুটিন: সামান্য ওজন কমানো</h4>
                               <p>• <b>কার্ডিও:</b> প্রতিদিন ৩০-৪০ মিনিট দ্রুত হাঁটা বা সাইকেল চালানো।</p>
                               <p>• <b>পেটের ব্যায়াম:</b> প্লাংক (৩০ সেকেন্ড করে ৩ বার) এবং ক্রাঞ্চেস।</p>`;
                } else {
                    content = `<h4>🏋️ ব্যায়াম ও ফিটনেস রুটিন: নিখুঁত ফিটনেস ধরে রাখা</h4>
                               <p>• <b>সক্রিয় জীবনযাপন:</b> প্রতিদিন সকালে ২০-৩০ মিনিট ফ্রি-হ্যান্ড এক্সারসাইজ বা হাঁটা।</p>
                               <p>• <b>যোগব্যায়াম:</b> শরীর নমনীয় রাখতে হালকা স্ট্রেচিং বা ইয়োগা করুন।</p>`;
                }
            } else {
                content = `<h4>🏋️ ব্যায়াম ও ফিটনেস রুটিন: ওজন কমানো</h4>
                           <p>• <b>কার্ডিও ও ফ্যাট বার্ন:</b> প্রতিদিন সকালে ৪০-৪৫ মিনিট দ্রুত দৌড়ানো, স্কিপিং (দড়ি লাফালাফি) বা সাইকেল চালানো।</p>
                           <p>• <b>ব্যায়াম:</b> বিকেলে ১৫-২০ মিনিট জাম্পিং জ্যাকস ও প্লাংক করুন যা দ্রুত মেদ ঝরাতে সাহায্য করবে।</p>`;
            }
        }
        workoutBox.innerHTML = content;
        workoutBox.classList.remove("hidden");
        workoutBtn.innerText = t["hide_workout_btn"];
    } else {
        workoutBox.classList.add("hidden");
        workoutBtn.innerText = t["workout_btn"];
    }
}