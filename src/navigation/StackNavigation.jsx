import SplashScreen from "../screens/StartScreens/SplashScreen.jsx";
import LoadingScreen from "../screens/StartScreens/LoadingScreen.jsx";
import OnboardingScreen from "../screens/OnboardingScreens/OnboardingScreen.jsx";
import CreateAccountScreen from "../screens/OnboardingScreens/CreateAccountScreen.jsx";
import SignupScreen from "../screens/Auth/Signup.jsx";
import VerifyOTP from "../screens/Auth/PhoneVerification.jsx";
import LoginScreen from "../screens/Auth/Login.jsx";
import ForgetPasswordScreen from "../screens/Auth/ForgotPassword.jsx";
import ForgetPasswordAccountVerification from "../screens/Auth/ForgetPasswordAccoutVerification.jsx";
import CreateNewPassword from "../screens/Auth/CreatenewPassword.jsx";
import PasswordSuccessScreen from "../screens/Auth/PasswordSuccessScreen.jsx";
import JoinTrustedCommunity from "../screens/Auth/JoinTrustedCommunity.jsx";
import ChoosePlanScreen from "../screens/Auth/ChoosePlan.jsx";
import ChoosePlan from "../screens/Auth/SecureYourSubscription.jsx";
import MembershipActivated from "../screens/Auth/MembershipActivated.jsx";
import BottomNavigation from './BottomNavigation.jsx';
import PersonalInformationScreen from "../screens/TechnicianSetttingScreen/ClientPersonalInformationScreen.jsx";
import TutorialsAndCoachingScreen from "../screens/TechnicianSetttingScreen/TutorialsAndCoachingScreen.jsx";
import TutorialDetailScreen from "../screens/TechnicianSetttingScreen/TutorialDetailScreen.jsx";
import GroupChatScreen from "../screens/HomeScreen/GroupChatScreen.jsx";
import PracticeModeScreen from "../screens/HomeScreen/PracticeModeScreen.jsx";
import PracticeCallScreen from "../screens/HomeScreen/PracticeCallScreen.jsx";
import AttemptHistory from "../screens/HomeScreen/AttemptHistory.jsx";
import AddNewSighting from "../screens/HomeScreen/AddNewSighting.jsx";
import RecentSightingsScreen from "../screens/HomeScreen/RecentSightingsScreen.jsx";
import EditSightingScreen from "../screens/HomeScreen/EditSightingScreen.jsx";
import JoinHuntGroupScreen from "../screens/HomeScreen/JoinHuntGroupScreen.jsx";
import CreateHuntGroupScreen from "../screens/HomeScreen/CreateHuntGroupScreen.jsx";
import GroupMessageChatScreen from "../screens/HomeScreen/GroupMessageChatScreen.jsx";
import ChangePasswordScreen from "../screens/TechnicianSetttingScreen/ClientChangePasswordScreen.jsx";
import SubscriptionScreen from "../screens/TechnicianSetttingScreen/ClientSubscriptionScreen.jsx";
import TermsAndConditionsScreen from "../screens/TechnicianSetttingScreen/ClientTermsAndConditionScreen.jsx";
import PrivacyPolicyScreen from "../screens/TechnicianSetttingScreen/ClientPrivacyPolicyScreen.jsx";

const AUTH_ROUTES = [

    {
        name: "splash_screen",
        component: SplashScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "loading_screen",
        component: LoadingScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "onboarding_screen",
        component: OnboardingScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "create_account",
        component: CreateAccountScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "signup",
        component: SignupScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "login",
        component: LoginScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "verify_otp",
        component: VerifyOTP,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "join_trusted_community",
        component: JoinTrustedCommunity,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "choose_plan",
        component: ChoosePlanScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "secure_subscription",
        component: ChoosePlan,
        options: { headerShown: false, gestureEnabled: false }
    },

    {
        name: "membership_activated",
        component: MembershipActivated,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "forgot_password",
        component: ForgetPasswordScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "forget_password_account_verification",
        component: ForgetPasswordAccountVerification,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "create_new_password",
        component: CreateNewPassword,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "password_success",
        component: PasswordSuccessScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "personal_information",
        component: PersonalInformationScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "tutorials_and_coaching_screen",
        component: TutorialsAndCoachingScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "tutorial_detailScreen",
        component: TutorialDetailScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "group_chat_screen",
        component: GroupChatScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "practice_mode",
        component: PracticeModeScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "practice_call",
        component: PracticeCallScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "attempt_history",
        component: AttemptHistory,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "add_new_sighting",
        component: AddNewSighting,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "change_password",
        component: ChangePasswordScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "subscription",
        component: SubscriptionScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "terms_conditions",
        component: TermsAndConditionsScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    
    {
        name: "privacy_policy",
        component: PrivacyPolicyScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "recent_sightings",
        component: RecentSightingsScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "edit_sighting",
        component: EditSightingScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "join_hunt_group",
        component: JoinHuntGroupScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "create_hunt_group",
        component: CreateHuntGroupScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "group_chat",
        component: GroupMessageChatScreen,
        options: { headerShown: false, gestureEnabled: false }
    },


    // New Screen end not a auth screen part

    {
        name: "home_screen",
        component: BottomNavigation,
        options: {
            headerShown: false,
            gestureEnabled: false
        },
        authRequired: false,
    },


]


export const getAuthScreens = () => {
    return Object.values(AUTH_ROUTES).filter(route => route.authRequired === false);
};

export const getProtectedScreens = () => {
    return Object.values(AUTH_ROUTES).filter(route => route.authRequired === true);
};

export const getScreenOptions = (routeName) => {
    return AUTH_ROUTES.find(route => route.name === routeName)?.options || {};
};

export default AUTH_ROUTES;


