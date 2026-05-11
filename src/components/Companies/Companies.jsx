import React from "react";

// importing company logos
import emami from "../../assets/Companies/Emami-opt.webp";
import atlas from "../../assets/Companies/Atlas-opt.webp";
import gitlab from "../../assets/Companies/Gitlab-opt.webp";
import wellsFargo from "../../assets/Companies/Wells-Fargo-opt.webp";
import eyLogo from "../../assets/Companies/EY-opt.webp";
import bdoLogo from "../../assets/Companies/BDO-opt.webp"
import vodafoneLogo from "../../assets/Companies/Vodafone-opt.webp";
import kpmg from "../../assets/Companies/KPMG-opt.webp";
import suzlon from "../../assets/Companies/Suzlon-opt.webp";
import hpLogo from "../../assets/Companies/HP-opt.webp";
import deloitteLogo from "../../assets/Companies/Deloitte-opt.webp";
import deutscheBankLogo from "../../assets/Companies/Deutsche-Bank-opt.webp";
import courseraLogo from "../../assets/Companies/Coursera-opt.webp"
import pwcLogo from "../../assets/Companies/PWC-opt.webp";
import comptrollerLogo from "../../assets/Companies/Comptroller-opt.webp";
import eatonLogo from "../../assets/Companies/Eaton-opt.webp"
import cognizantLogo from "../../assets/Companies/Cognizant-opt.webp"
import hexawareLogo from "../../assets/Companies/Hexaware-opt.webp"
import orix from "../../assets/Companies/Orix-opt.webp"
import jpMorganChase from "../../assets/Companies/JP-Morgan-Chase-opt.webp"
import kotakMahindraBankLogo from "../../assets/Companies/Kotak-opt.webp"
import sbiLifeInsuranceLogo from "../../assets/Companies/SBI-opt.webp"
import yesBankLogo from "../../assets/Companies/Yes-Bank-opt.webp"
import allstateLogo from "../../assets/Companies/Allstate-India-opt.webp"
import truLogo from "../../assets/Companies/Tru-opt.webp"
import powerGridLogo from "../../assets/Companies/Power-Grid-opt.webp"
import rblBank from "../../assets/Companies/RBL-opt.webp"
import londonStockExchange from "../../assets/Companies/London-Stock-Exchange-opt.webp"
import sunPharmaseutical from "../../assets/Companies/Sun-Pharma-opt.webp"
import hsbc from "../../assets/Companies/HSBC-opt.webp"
import gspu from "../../assets/Companies/GSPU-opt.webp"
import equitas from "../../assets/Companies/Equitas-opt.webp"
import bse from "../../assets/Companies/BSE-opt.webp"
import wipro from "../../assets/Companies/Wipro-opt.webp"
import zensar from "../../assets/Companies/Zensar-opt.webp"
import luthra from "../../assets/Companies/Luthra-Group-opt.webp"
import riskman from "../../assets/Companies/Riskman-opt.webp"

// importing marquee
import Marquee from "../Marquee/Marquee";

export default function Companies() {

    const companiesOne = [jpMorganChase, atlas, gitlab, kpmg, suzlon, wellsFargo, hpLogo, pwcLogo, eyLogo, luthra]

    const companiesTwo = [deloitteLogo, riskman, bdoLogo, comptrollerLogo, vodafoneLogo, deutscheBankLogo, kotakMahindraBankLogo, sbiLifeInsuranceLogo, yesBankLogo, cognizantLogo]

    const companiesThree = [eatonLogo, courseraLogo, allstateLogo, hexawareLogo, sunPharmaseutical, powerGridLogo, bse, wipro, zensar]

    const companiesFour = [rblBank, londonStockExchange, orix, truLogo, emami, hsbc, gspu, equitas]

    return (
        <>
            <div className="py-12 md:max-w-3xl lg:max-w-6xl mx-auto flex flex-col items-center overflow-x-hidden">
                <div className="flex flex-col gap-2 justify-center items-center p-4 mb-20">
                    <h2 className="text-2xl md:text-4xl font-bold text-center">Join Thousands of <span className="text-brand-blue font-normal italic">Professionals</span> from <span className="text-brand-blue font-normal italic">Leading Companies</span>
                    </h2>
                    <p className="text-xs md:text-base lg:text-lg font-poppins text-center text-gray-600 mt-6 md:max-w-xl lg:max-w-6xl">
                        Trusted by professionals from top multinational corporations for CIA, CISA, CRMA, and IAP certifications
                    </p>
                </div>
                <div className="container mx-auto">
                    <div className="flex myGradient ">
                        <Marquee companies={companiesOne} start={0} end={"-100%"} />
                    </div>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="flex myGradient ">
                        <Marquee companies={companiesTwo} start={"-100%"} end={0} />
                    </div>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="flex myGradient ">
                        <Marquee companies={companiesThree} start={0} end={"-100%"} />
                    </div>
                </div>
                <div className="container mx-auto mt-8">
                    <div className="flex myGradient ">
                        <Marquee companies={companiesFour} start={"-100%"} end={0} />
                    </div>
                </div>
            </div>
        </>
    );
}