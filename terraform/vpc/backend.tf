
terraform {
  backend "gcs" {
    bucket  = var.terraform_bucket
  }
}