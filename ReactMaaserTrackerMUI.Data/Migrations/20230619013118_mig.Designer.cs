﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReactMaaserTrackerMUI.Data;

#nullable disable

namespace ReactMaaserTrackerMUI.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230619013118_mig")]
    partial class mig
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ReactMaaserTrackerMUI.Data.Income", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("IncomeDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SourceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SourceId");

                    b.ToTable("Income");
                });

            modelBuilder.Entity("ReactMaaserTrackerMUI.Data.Maaser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("MaaserDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Recipient")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Maaser");
                });

            modelBuilder.Entity("ReactMaaserTrackerMUI.Data.Source", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Label")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SourceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Sources");
                });

            modelBuilder.Entity("ReactMaaserTrackerMUI.Data.Income", b =>
                {
                    b.HasOne("ReactMaaserTrackerMUI.Data.Source", "Source")
                        .WithMany()
                        .HasForeignKey("SourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Source");
                });
#pragma warning restore 612, 618
        }
    }
}
