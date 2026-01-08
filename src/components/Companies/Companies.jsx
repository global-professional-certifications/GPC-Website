import React from "react";

// importing company logos
import emami from "../../assets/Companies/Emami.png";
import atlas from "../../assets/Companies/Atlas.png";
import gitlab from "../../assets/Companies/Gitlab.png";
import wellsFargo from "../../assets/Companies/Wells-Fargo.png";
import eyLogo from "../../assets/Companies/EY.png";
import bdoLogo from "../../assets/Companies/BDO.png"
import vodafoneLogo from "../../assets/Companies/Vodafone.png";
import kpmg from "../../assets/Companies/KPMG.png";
import suzlon from "../../assets/Companies/Suzlon.png";
import hpLogo from "../../assets/Companies/HP.png";
import deloitteLogo from "../../assets/Companies/Deloitte.png";
import deutscheBankLogo from "../../assets/Companies/Deutsche-Bank.png";
import courseraLogo from "../../assets/Companies/Coursera.png"
import pwcLogo from "../../assets/Companies/PWC.png";
import comptrollerLogo from "../../assets/Companies/Comptroller.png";
import eatonLogo from "../../assets/Companies/Eaton.png"
import cognizantLogo from "../../assets/Companies/Cognizant.png"
import hexawareLogo from "../../assets/Companies/Hexaware.png"
import orix from "../../assets/Companies/Orix.png"
import jpMorganChase from "../../assets/Companies/JP-Morgan-Chase.png"
import kotakMahindraBankLogo from "../../assets/Companies/Kotak.png"
import sbiLifeInsuranceLogo from "../../assets/Companies/SBI.png"
import yesBankLogo from "../../assets/Companies/Yes-Bank.png"
import allstateLogo from "../../assets/Companies/Allstate-India.png"
import truLogo from "../../assets/Companies/Tru.png"
import powerGridLogo from "../../assets/Companies/Power-Grid.png"
import rblBank from "../../assets/Companies/RBL.png"
import londonStockExchange from "../../assets/Companies/London-Stock-Exchange.png"
import sunPharmaseutical from "../../assets/Companies/Sun-Pharma.png"
import hsbc from "../../assets/Companies/HSBC.png"
import gspu from "../../assets/Companies/GSPU.png"
import equitas from "../../assets/Companies/Equitas.png"
import bse from "../../assets/Companies/BSE.png"
import wipro from "../../assets/Companies/Wipro.png"
import zensar from "../../assets/Companies/Zensar.png"
import luthra from "../../assets/Companies/Luthra-Group.png"
import riskman from "../../assets/Companies/Riskman.png"

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